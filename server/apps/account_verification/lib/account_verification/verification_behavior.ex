defprotocol AccountVerification.VerificationBehaviour do
  @moduledoc """
  Behavior to follow for verification modules
  """

  @callback create_verification_code(identifier :: String.t) :: {:ok, String.t}
  @callback accept_verification_code(identifier :: String.t) :: {:error | :ok, any}
end
