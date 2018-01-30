defmodule UserSession do
  @moduledoc """
  This module allows sessions for users to be tracked by
  passing in an ID and token
  """


  use GenServer

  import Logger, only: [info: 2]

  alias UserSession.Helpers

  # API
  def start_link(opts \\ []), do: GenServer.start_link(__MODULE__, [], Keyword.merge([name: __MODULE__], opts))

  @spec activate_session(integer | String.t) :: {:ok, {String.t, NaiveDateTime.t}}
  def activate_session(user_id) do
    info("Activating user session", user_id: user_id)

    GenServer.call(__MODULE__, {:activate_session, user_id})
  end

  @spec destroy_session(integer | String.t) :: :ok
  def destroy_session(user_id) do
    info("Destroying user session", user_id: user_id)

    GenServer.call(__MODULE__, {:destroy_session, user_id})
  end

  @spec session_active?(integer | String.t, String.t) :: boolean
  def session_active?(user_id, token) do
    GenServer.call(__MODULE__, {:session_active?, user_id, token})
  end

  @spec get_user_from_token(String.t) :: {:error, :no_user_found} | {:ok, %EctoSchemas.Accounts.User{}}
  def get_user_from_token(token) do
    GenServer.call(__MODULE__, {:get_user_from_token, token})
  end

  # SERVER
  def init(_), do: {:ok, %{}}

  def handle_call({:activate_session, user_id}, _from, state), do: Helpers.create_session_for_state(state, user_id)
  def handle_call({:destroy_session, user_id}, _from, state), do: Helpers.destroy_state_session(state, user_id)
  def handle_call({:session_active?, user_id, token}, _from, state), do: Helpers.state_session_active?(state, user_id, token)
  def handle_call({:get_user_from_token, token}, _from, state), do: Helpers.get_user_from_token(state, token)
end
