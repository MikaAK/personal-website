defmodule WebApi.Middleware.ChangesetErrorFormatter do
  @moduledoc """
  Middleware for absinthe to format changeset errors output by ecto
  """

  @behaviour Absinthe.Middleware

  def call(%{errors: []} = res, _), do: res
  def call(%{errors: errors} = res, _), do: %{res | errors: format_changeset_error(errors)}

  def format_changeset_error(errors) when is_list(errors) do
    cond do
      Enum.all?(errors, &is_bitstring/1) -> errors
      Enum.all?(errors, &is_changeset/1) -> Enum.flat_map(errors, &format_changeset_error/1)
      Enum.all?(errors, &is_map/1) -> errors
      true -> Enum.flat_map(errors, &format_changeset_error/1)
    end
  end

  def format_changeset_error(%Ecto.Changeset{} = changeset) do
    changeset
      |> interpolate_errors
      |> Map.to_list
      |> Enum.flat_map(fn {field, errors} -> field_errors_to_error(changeset, field, errors) end)
  end
  def format_changeset_error(error), do: error

  def field_errors_to_error(changeset, field, errors) do
    # field_name = Atom.to_string(field)

    Enum.flat_map(errors, fn
      map_errors when is_map(map_errors) ->
        Enum.flat_map(Map.to_list(map_errors), fn {field_name, field_errors} ->
          field_errors_to_error(changeset, "#{to_normal_string(field)}.#{to_normal_string(field_name)}", field_errors)
        end)
      error -> [%{
        message: "#{to_normal_string(field)} #{error}",
        value: error_field_value(changeset, field)
      }]
    end)
  end

  defp interpolate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end

  defp error_field_value(changeset, field) do
    case Ecto.Changeset.fetch_field(changeset, field) do
      {_, value} -> format_error_value(value)
      :error -> nil
    end
  end

  defp format_error_value(items) when is_list(items), do: Enum.map(items, &format_error_value/1)

  defp format_error_value(%{__struct__: struct} = schema) do
    schema
      |> Map.take(struct.__schema__(:fields))
      |> Map.drop([:password_hash, :password])
      |> ProperCase.to_camel_case
  end

  defp format_error_value(val), do: val

  defp is_changeset(%Ecto.Changeset{} = _), do: true
  defp is_changeset(_), do: false

  defp to_normal_string(field_name) when is_atom(field_name) do
    field_name
      |> Atom.to_string
      |> to_normal_string
  end

  defp to_normal_string(field_name), do: ProperCase.camel_case(field_name)
end
