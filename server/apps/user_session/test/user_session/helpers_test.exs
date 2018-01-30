defmodule UserSessionHelpersTest do
  use EctoSchemas.DataCase, async: true

  alias UserSession.Helpers

  setup do
    user = EctoSchemas.Factory.insert!(:accounts_user)

    {:ok, %{user: user}}
  end

  describe "#create_session_for_state" do
    test "adds token under user_id in state", %{user: %{id: user_id}}do
      token = Helpers.create_token(user_id)
      {:reply, {:ok, session_info}, state} = Helpers.create_session_for_state(%{}, user_id, token)
      {state_token, state_exp} = Map.get(state, user_id)
      {session_info_token, session_info_exp} = session_info

      assert state_token === token
      assert state_token === session_info_token
      assert state_exp === session_info_exp
    end
  end

  describe "#get_user_from_token" do
    test " returns {:ok, user} if token is linked to a user", %{user: %{id: user_id}} do
      token_info = generate_test_token(user_id, create_test_future_date_time())
      {token, exp} = token_info
      state = Map.new([{user_id, token_info}])

      assert {:reply, {:ok, token_user}, state} = Helpers.get_user_from_token(state, token)
      assert  {^token, ^exp} = Map.get(state, user_id)
      assert token_user.id === user_id
    end

    test "returns {:error, :no_user_found} if no token is found", %{user: %{id: user_id}} do
      {:reply, result, _state} = Helpers.get_user_from_token(%{}, Helpers.create_token(user_id))

      assert result === {:error, :no_user_found}
    end
  end

  describe "#state_session_active?" do
    test "returns true if a user_ids token is present and exp in future", %{user: %{id: user_id}} do
      token_info = generate_test_token(user_id, create_test_future_date_time())
      {token, _exp} = token_info
      is_active? = check_is_active?(user_id, token, Map.new([{user_id, token_info}]))

      assert is_active?
    end

    test "state_session_active? returns false if exp is after now", %{user: %{id: user_id}} do
      token_info = generate_test_token(user_id, create_test_past_date_time())
      {token, _exp} = token_info
      is_active? = check_is_active?(user_id, token, Map.new([{user_id, token_info}]))

      refute is_active?
    end

    test "state_session_active? returns false if a user_ids token is not present", %{user: %{id: user_id}} do
      is_active? = check_is_active?(user_id, Helpers.create_token(user_id), %{})

      refute is_active?
    end

    test "state_session_active? returns false if a user_ids token doesn't match", %{user: %{id: user_id}} do
      token_info = generate_test_token(user_id, create_test_future_date_time())
      is_active? = check_is_active?(user_id, Helpers.create_token(user_id), Map.new([{user_id, token_info}]))

      refute is_active?
    end
  end
  defp generate_test_token(user_id, exp), do: {Helpers.create_token(user_id, exp), exp}

  def create_test_past_date_time, do: NaiveDateTime.utc_now()
    |> NaiveDateTime.add(:timer.hours(-10))
    |> DateTime.from_naive!("Etc/UTC")

  def create_test_future_date_time, do: NaiveDateTime.utc_now()
    |> NaiveDateTime.add(:timer.hours(10))
    |> DateTime.from_naive!("Etc/UTC")

  defp check_is_active?(user_id, token, state) do
    {:reply, is_active?, _state} = Helpers.state_session_active?(state, user_id, token)

    is_active?
  end
end
