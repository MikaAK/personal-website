defmodule AccountVerification.VerificationImpl do
  import Logger, only: [info: 2]

  @moduledoc false

  def create_verification_code(state, verification_module, identifier) do
    info("Attempting to create verification code", identifier: identifier)

    case apply(verification_module, :create_verification_code, [identifier]) do
      {:ok, code} ->
        info("Created verification code", identifier: identifier, code: code)

        {{:ok, code}, Map.put(state, identifier, code)}

      {:error, error} -> {{:error, error}, state}
      error -> {{:error, error}, state}
    end
  end

  def check_verification_code(state, verification_module, identifier, code) do
    info("Checking verification code", [identifier: identifier])

    cond do
      !Map.has_key?(state, identifier) -> {{:error, "No verification code found pending for #{identifier}"}, state}
      Helpers.String.remove_spaces(Map.get(state, identifier)) === Helpers.String.remove_spaces(code) ->
        info("Accepting verification code", identifier: identifier, code: code)

        {
          apply(verification_module, :accept_verification_code, [identifier]),
          Map.delete(state, identifier)
        }

      true -> {{:error, incorrect_code_error(identifier)}, state}
    end
  end

  defp incorrect_code_error(identifier) do
    """
    The verification code you entered doesn’t match the verification code that we sent for #{identifier}.
    Please double-check the verification code and try again.
    """
  end
end
