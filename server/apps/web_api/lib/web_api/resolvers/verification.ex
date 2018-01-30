defmodule WebApi.Resolvers.Verification do
  @moduledoc false

  def send_email_verification(%{account_user_email: email}, _) do
    with {:ok, _} <- AccountVerification.send_email_verification(email) do
      {:ok, %{is_verification_sent: true}}
    end
  end

  def accept_email_verification(%{account_user_email: email, verification_code: code}, _) do
    with :ok <- AccountVerification.verify_email(email, code) do
      {:ok, %{is_verification_accepted: true}}
    else
      _ -> {:error, invalid_email_error(email)}
    end
  end

  def send_sms_verification(%{phone_number: number}, _) do
    with {:ok, _} <- AccountVerification.send_sms_verification(number) do
      {:ok, %{is_verification_sent: true}}
    end
  end

  def accept_sms_verification(%{phone_number: number, verification_code: code}, _) do
    with :ok <- AccountVerification.verify_sms(number, code) do
      {:ok, %{is_verification_accepted: true}}
    end
  end

  defp invalid_email_error(email) do
    """
    There appears to be an issue with the validation link you are using for #{email}.
    Please check that this is the link included in the email you received.
    """
  end
end
