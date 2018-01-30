defmodule WebApi.Schema do
  @moduledoc false

  use Absinthe.Schema

  alias WebApi.{Middleware, Resolvers}
  alias WebApi.Schema.{Queries, Mutations}
  alias EctoSchemas.Accounts

  import_types Absinthe.Type.Custom
  import_types WebApi.Types.Session
  import_types WebApi.Types.Verification
  import_types WebApi.Types.Accounts.User

  import_types Queries.Accounts
  import_types Mutations.Accounts
  import_types Mutations.Sessions
  import_types Mutations.Verification

  query do
    import_fields :accounts_user_queries
  end

  mutation do
    import_fields :accounts_user_mutations
    import_fields :session_mutations
    import_fields :verification_mutations
  end

  def context(ctx) do
    loader = Dataloader.new()
      |> Dataloader.add_source(Accounts.User, Resolvers.AccountsUser.data())

    Map.put(ctx, :loader, loader)
  end

  def middleware(middleware, _field, %{identifier: :mutation}) do
    middleware ++ [Middleware.ChangesetErrorFormatter]
  end

  def middleware(middleware, _, _) do
    middleware
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end
end
