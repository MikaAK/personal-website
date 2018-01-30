defmodule EctoSchemas.CommonFilters do
  @moduledoc """
  This modules main purpose is to house a collection of common schema filters
  and functionality to be included in params -> filters
  """

  import Ecto.Query
  import Logger, only: [debug: 1]

  @spec convert_params_to_filter(queryable :: Ecto.Query.t(), params :: Keyword.t | map) :: Ecto.Query.t
  @doc """
  Converts a set of params to filters on a query

  ## Examples

    iex> EctoSchemas.Accounts.User
    iex>   |> EctoSchemas.Actions.convert_params_to_filter(%{ids: [1, 2, 3]})
    iex>   |> inspect
    "#Ecto.Query<from u in EctoSchemas.Accounts.User, where: u.id in ^[1, 2, 3], order_by: [asc: u.id]>"
  """
  def convert_params_to_filter(query, params)
  def convert_params_to_filter(query, params) when params === %{}, do: query
  def convert_params_to_filter(query, params) when is_map(params), do: convert_params_to_filter(query, Map.to_list(params))
  def convert_params_to_filter(query, params) when is_list(params), do: Enum.reduce(params, order_by(query, :id), &create_schema_filter/2)

  defp create_schema_filter({:start_date, val}, query), do: where(query, [m], m.inserted_at >= ^(val))
  defp create_schema_filter({:end_date, val}, query), do: where(query, [m], m.inserted_at <= ^val)
  defp create_schema_filter({:before, id}, query), do: where(query, [m], m.id < ^id)
  defp create_schema_filter({:after, id}, query), do: where(query, [m], m.id > ^id)
  defp create_schema_filter({:ids, ids}, query), do: where(query, [m], m.id in ^ids)
  defp create_schema_filter({:first, val}, query), do: limit(query, ^val)
  defp create_schema_filter({:last, val}, query) do
    query
      |> exclude(:order_by)
      |> from(order_by: [desc: :inserted_at], limit: ^val)
      |> subquery
      |> order_by(:id)
  end

  # Below is a function that allows filtering on any natural field owned by schema
  defp create_schema_filter({filter_field, val}, %{from: {_, schema}} = query), do: create_schema_filter({filter_field, val}, schema, query)
  defp create_schema_filter({filter_field, val}, schema), do: create_schema_filter({filter_field, val}, schema, schema)

  defp create_schema_filter({filter_field, val}, %{from: %{query: %{from: {_, schema}}}}, query) do
    create_schema_filter({filter_field, val}, schema, query)
  end
  defp create_schema_filter({filter_field, val}, schema, query) do
    if filter_field in schema.__schema__(:fields) do
      where(query, [scm], field(scm, ^filter_field) == ^val)
    else
      debug "create_schema_filter: #{Atom.to_string(filter_field)} is not a field for #{schema.__schema__(:source)} where filter"

      query
    end
  end
end
