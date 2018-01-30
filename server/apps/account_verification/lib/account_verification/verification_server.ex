defmodule AccountVerification.VerificationServer do
  @moduledoc """
  GenServer that uses takes in a module that follows
  `VerificationBehaviour`. ALlows for generating and checking verification codes
  """

  use GenServer

  alias AccountVerification.VerificationImpl

  # API
  def start_link([{name, verification_module}]), do: GenServer.start_link(__MODULE__, verification_module, [name: name])

  @spec send_verification_code(server :: GenServer.server, identifier :: String.t) :: :ok
  def send_verification_code(server, identifier), do: GenServer.call(server, {:send_verification_code, identifier})

  @spec check_verification_code(server :: GenServer.server, identifier :: String.t, code :: String.t) :: :ok | {:error, String.t}
  def check_verification_code(server, identifier, code), do: GenServer.call(server, {:check_verification_code, identifier, code})

  # SERVER
  def init(verification_module), do: {:ok, %{verification_module: verification_module}}

  def handle_call({:send_verification_code, identifier}, _from, %{verification_module: verification_module} = state) do
    state
      |> VerificationImpl.create_verification_code(verification_module, identifier)
      |> Helpers.GenServer.reply
  end

  def handle_call({:check_verification_code, identifier, code}, _from, %{verification_module: verification_module} = state) do
    state
      |> VerificationImpl.check_verification_code(verification_module, identifier, code)
      |> Helpers.GenServer.reply
  end
end
