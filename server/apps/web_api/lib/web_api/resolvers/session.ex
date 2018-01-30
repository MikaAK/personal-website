defmodule WebApi.Resolvers.Session do
  @moduledoc false

  alias EctoSchemas.Accounts

  def login(%{email: email, password: password}, _) do
    with {:ok, user} <- Accounts.find_user_and_confirm_password(email, password),
         {:ok, {token, exp}} <- UserSession.activate_session(user.id) do
      {:ok, %{
        account_user: user,
        session_info: %{
          token: token,
          expiry: exp
        }
      }}
    end
  end

  def logout(_, %{context: %{current_user: %{id: user_id}}}) do
    with :ok <- UserSession.destroy_session(user_id) do
      {:ok, %{is_logged_out: true}}
    end
  end
end
