defmodule WebApi.Types.Session do
  @moduledoc false

  use Absinthe.Schema.Notation

  object :session_info do
    field :token, :string
    field :expiry, :datetime
  end

  object :login_response do
    field :account_user, :account_user
    field :session_info, :session_info
  end

  object :session_logout do
    field :is_logged_out, :boolean
  end
end
