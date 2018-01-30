defmodule WebApi.Resolvers.AccountsUser do
  @moduledoc false

  alias EctoSchemas.{CommonFilters, Repo, Accounts}

  def data, do: Dataloader.Ecto.new(Repo, query: &CommonFilters.convert_params_to_filter/2)

  def me(_params, %{context: %{current_user: user}}), do: {:ok, user}

  def all(params, _info) when params == %{}, do: {:ok, Accounts.get_all_users()}
  def all(params, _info), do: {:ok, Accounts.get_all_users(params)}

  def find(params, _info), do: Accounts.find_user(params)

  def create(%{account_user: user}, _info), do: Accounts.create_user(user)
end
