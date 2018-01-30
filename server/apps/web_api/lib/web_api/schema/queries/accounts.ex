defmodule WebApi.Schema.Queries.Accounts do
  @moduledoc false

  use Absinthe.Schema.Notation

  import WebApi.Types.SharedArgs, only: [all_resolver_args: 0]
  alias WebApi.Resolvers

  object :accounts_user_queries do
    field :me, :account_user do
      middleware WebApi.Middleware.Auth

      resolve &Resolvers.AccountsUser.me/2
    end

    field :account_user, :account_user do
      arg :id, :id
      arg :email, :string
      arg :phone_number, :string
      arg :full_name, :string
      arg :age, :integer
      arg :is_email_verified, :boolean

      resolve &Resolvers.AccountsUser.find/2
    end

    field :accounts_users, list_of(:account_user) do
      all_resolver_args
      arg :full_name, :string
      arg :age, :integer
      arg :is_email_verified, :boolean

      resolve &Resolvers.AccountsUser.all/2
    end
  end
end
