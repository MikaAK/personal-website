defmodule WebApi.Middleware.Auth do
  @moduledoc """
  Authentication middleware for absinthe
  """

  @behaviour Absinthe.Middleware

  def call(%{context: %{current_user: user, token: token}} = res, _) do
    if UserSession.session_active?(user.id, token) do
      res
    else
      put_inactive_token_error(res)
    end
  end

  def call(res, _), do: put_error(res, "unauthenticated")

  defp put_error(res, error_message), do: Absinthe.Resolution.put_result(res, {:error, error_message})
  defp put_inactive_token_error(res), do: put_error(res, "user token is not active")
end
