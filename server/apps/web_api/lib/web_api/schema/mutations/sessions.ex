defmodule WebApi.Schema.Mutations.Sessions do
  @moduledoc false

  use Absinthe.Schema.Notation

  alias WebApi.Resolvers

  object :session_mutations do
    field :login, :login_response do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Resolvers.Session.login/2
    end

    field :logout, :session_logout do
      middleware WebApi.Middleware.Auth

      resolve &Resolvers.Session.logout/2
    end
  end
end
