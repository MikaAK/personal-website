defmodule WebApi.Context do
  @behaviour Plug
  @moduledoc """
  This module is a context plug for absinthe. This allows us to set any connection related
  things into absinthes context
  """

  import Plug.Conn

  def init(opts), do: opts
  def call(conn, _) do
    with {:ok, user, token} <- get_authorization(conn) do
      put_private(conn, :absinthe, %{context: %{current_user: user, token: token}})
    else
      _ -> conn
    end
  end

  defp get_authorization(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, user} <- UserSession.get_user_from_token(token) do
      {:ok, user, token}
    else
      _ -> {:error, "no token"}
    end
  end
end
