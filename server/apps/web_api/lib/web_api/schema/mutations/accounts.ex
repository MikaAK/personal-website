defmodule WebApi.Schema.Mutations.Accounts do
  @moduledoc false

  use Absinthe.Schema.Notation

  alias WebApi.Resolvers

  object :accounts_user_mutations do
    field :create_account_user, :account_user do
      arg :account_user, non_null(:account_user_input)

      resolve &Resolvers.AccountsUser.create/2
    end
  end
end
