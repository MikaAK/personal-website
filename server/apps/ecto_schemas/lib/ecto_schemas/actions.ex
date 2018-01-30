defmodule EctoSchemas.Actions do
  @moduledoc """
  Actions for crud in ecto, this can be used by all schemas/queries
  """

  alias EctoSchemas.{CommonFilters, Repo}

  @spec get(queryable :: Ecto.Query.t() | Ecto.Schema.t, id :: term()) :: Ecto.Schema.t | nil
  @doc """
  Gets a schema from the database

  ## Examples

      iex> user = create_user()
      iex> %{id: id} = EctoSchemas.Actions.get(EctoSchemas.Accounts.User, user.id)
      iex> id === user.id
      true
      iex> EctoSchemas.Actions.get(EctoSchemas.Accounts.User, 2504390) # ID nonexistant
      nil
  """
  def get(schema, id), do: Repo.get(schema, id)

  @spec all(queryable :: Ecto.Query.t() | Ecto.Schema.t) :: list(Ecto.Schema.t) | []
  @doc """
  Gets a collection of schemas from the database

  ## Examples

      iex> EctoSchemas.Actions.all(EctoSchemas.Accounts.User)
      []
  """
  def all(query), do: Repo.all(query)

  @spec all(queryable :: Ecto.Query.t() | Ecto.Schema.t, params :: Keyword.t | map) :: list(Ecto.Schema.t) | []
  @doc """
  Gets a collection of schemas from the database but allows for a filter

  ## Examples

      iex> Enum.each(1..4, fn _ -> create_user() end)
      iex> length(EctoSchemas.Actions.all(EctoSchemas.Accounts.User, first: 3)) === 3
      true
  """
  def all(query, params), do: Repo.all(CommonFilters.convert_params_to_filter(query, params))

  @spec find(queryable :: Ecto.Query.t() | Ecto.Schema.t, params :: Keyword.t | map) :: {:ok, Ecto.Schema.t} | {:error, String.t}
  @doc """
  Finds a schema with matching params

  ## Examples

      iex> user = create_user()
      iex> {:ok, schema} = EctoSchemas.Actions.find(EctoSchemas.Accounts.User, full_name: user.full_name)
      iex> schema.full_name === user.full_name
      true
  """
  def find(query, params) do
    case query |> CommonFilters.convert_params_to_filter(params) |> Ecto.Query.first |> Repo.one do
      nil -> {:error, "no items found with where: #{inspect params}"}
      schema -> {:ok, schema}
    end
  end

  @spec create(Ecto.Schema.t, map | Keyword.t) :: {:ok, Ecto.Schema.t} | {:error, Ecto.Changeset.t}
  @doc """
  Creates a schema with given params

  ## Examples

      iex> {:ok, schema} = EctoSchemas.Actions.create(EctoSchemas.Accounts.User, user_params(full_name: "TEST"))
      iex> schema.full_name
      "TEST"
      iex> {:error, changeset} = EctoSchemas.Actions.create(EctoSchemas.Accounts.User, Map.delete(user_params(), :full_name))
      iex> "can't be blank" in errors_on(changeset).full_name
      true
  """
  def create(schema, params), do: params |> schema.create_changeset |> Repo.insert

  @spec update(Ecto.Schema.t, integer, map | Keyword.t) :: {:ok, Ecto.Schema.t} | {:error, Ecto.Changeset.t}
  @doc """
  Updates a schema with given updates

  ## Examples

      iex> user = create_user()
      iex> {:ok, schema} = EctoSchemas.Actions.update(EctoSchemas.Accounts.User, user, full_name: user.full_name)
      iex> schema.full_name === user.full_name
      true
  """
  def update(schema, schema_id, updates) when is_integer(schema_id) do
    case get(schema, schema_id) do
      nil -> {:error, "No item found with id: #{schema_id}"}
      schema_data -> update(schema, schema_data, updates)
    end
  end

  @spec update(Ecto.Schema.t, map, Keyword.t) :: {:ok, Ecto.Schema.t} | {:error, Ecto.Changeset.t}
  def update(schema, schema_data, updates) when is_list(updates) do
    schema_data
      |> schema.changeset(Map.new(updates))
      |> Repo.update
  end

  @spec update(Ecto.Schema.t, map, map) :: {:ok, Ecto.Schema.t} | {:error, Ecto.Changeset.t}
  def update(schema, schema_data, updates), do: Repo.update(schema.changeset(schema_data, updates))
end
