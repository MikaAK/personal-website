defmodule EctoSchemas.Accounts do
  @moduledoc """
  This module contains functions that work with all the accounts schemas
  """

  alias EctoSchemas.{Actions, Accounts}

  def get_user(id), do: Actions.get(Accounts.User, id)
  def get_all_users, do: Actions.all(Accounts.User)
  def get_all_users(params), do: Actions.all(Accounts.User, params)
  def create_user(params), do: Actions.create(Accounts.User, params)
  def update_user(user_id, params) when is_integer(user_id), do: Actions.update(Accounts.User, user_id, params)
  def update_user(user, params), do: Actions.update(Accounts.User, user, params)
  def find_user(params), do: Actions.find(Accounts.User, params)

  def find_user_and_confirm_password(email, password) do
    with {:ok, user} <- find_user(email: email) do
      check_user_password(user, password)
    else
      {:error, _} -> {:error, "no user with that email exists"}
    end
  end

  defp check_user_password(user, password) do
    if Comeonin.Argon2.checkpw(password, user.password_hash) do
      {:ok, user}
    else
      {:error, "Your password is incorrect"}
    end
  end
end
