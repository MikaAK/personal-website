defmodule WebApi.Resolvers.Helpers do
  @moduledoc false

  alias EctoSchemas.Repo


  @spec preload_id_map(Ecto.Schema.t, atom | list) :: map
  @doc """
  Preloads schemas with a key and turns it into a id map
  """
  def preload_id_map(schemas, key) do
    schemas
      |> Repo.preload(key)
      |> Enum.reduce(%{}, fn (schema, acc) -> Map.put(acc, schema.id, Map.get(schema, key)) end)
  end
end
