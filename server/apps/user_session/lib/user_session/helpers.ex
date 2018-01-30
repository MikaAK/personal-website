defmodule UserSession.Helpers do
  @moduledoc false

  @token_valid_duration Application.get_env(:user_session, :token_valid_duration)
  @token_valid_duration_amount Application.get_env(:user_session, :token_valid_duration_amount)
  @joken_secret Application.get_env(:user_session, :joken_secret)

  @spec create_session_for_state(map, term) :: {:reply, {:ok, {String.t, DateTime.t}}, map}
  def create_session_for_state(state, user_id, token \\ false) do
    exp = session_exp()
    session_info = {token || create_token(user_id, exp), exp}

    {:reply, {:ok, session_info}, Map.put(state, user_id, session_info)}
  end

  @spec destroy_state_session(map, term) :: {:reply, :ok, map}
  def destroy_state_session(state, user_id) do
    {:reply, :ok, Map.delete(state, user_id)}
  end

  @spec state_session_active?(map, integer, String.t) :: {:reply, boolean, map}
  def state_session_active?(state, user_id, token) do
    {state_token, _exp} = get_session(state, user_id)

    {:reply, state_token === token, state}
  end

  @spec get_user_from_token(map, String.t) :: {:reply, {:error, :no_user_found}, map} |
                                              {:reply, {:error, :token_expired}, map} |
                                              {:reply, {:ok, %EctoSchemas.Accounts.User{}}, map}
  def get_user_from_token(state, token) do
    user_id = Map.get(decrypt_token(token).claims, "user_id")
    {user_token, _} = get_session(state, user_id)
    user = EctoSchemas.Accounts.get_user(user_id)

    res = cond do
      !user_id or !user or !user_token -> {:error, :no_user_found}
      user_token !== token -> {:error, :token_expired}
      user_token === token -> {:ok, user}
    end

    {:reply, res, state}
  end

  def decrypt_token(token), do: token |> to_joken_token |> Joken.verify
  def create_token(user_id, exp \\ session_exp()), do: %{user_id: user_id}
    |> to_joken_token
    |> Joken.with_exp(exp)
    |> Joken.sign
    |> Joken.get_compact

  defp get_session(state, user_id) do
    case Map.get(state, user_id) do
      nil -> {nil, nil}
      {token, expiry} ->
        if Helpers.Date.datetime_is_after_now(expiry) do
          {token, expiry}
        else
          destroy_state_session(state, user_id)

          {nil, expiry}
        end
    end
  end

  defp to_joken_token(obj), do: obj |> Joken.token |> Joken.with_signer(Joken.hs256(@joken_secret))
  defp session_exp, do: NaiveDateTime.utc_now()
    |> NaiveDateTime.add(@token_valid_duration, @token_valid_duration_amount)
    |> DateTime.from_naive!("Etc/UTC")
end
