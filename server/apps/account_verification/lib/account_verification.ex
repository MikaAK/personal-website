defmodule AccountVerification do
  @moduledoc """
  Module for verifying user accounts
  """

  def send_sms_verification(phone_number) do
    AccountVerification.VerificationServer.send_verification_code(:sms, phone_number)
  end

  def verify_sms(phone_number, verification_code) do
    AccountVerification.VerificationServer.check_verification_code(:sms, phone_number, verification_code)
  end

  def send_email_verification(email) do
    AccountVerification.VerificationServer.send_verification_code(:email, email)
  end

  def verify_email(email, verification_code) do
    AccountVerification.VerificationServer.check_verification_code(:email, email, verification_code)
  end
end
