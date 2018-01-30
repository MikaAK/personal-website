defmodule WebApiSchemaVerificationMutationsTest do
  use WebApi.ConnCase

  @test_phone_number "778-234-0292"

  @send_email_verification """
  mutation SendEmailVerification($accountUserEmail: String!) {
    sendEmailVerification(accountUserEmail: $accountUserEmail) {
      isVerificationSent
    }
  }
  """

  @accept_email_verification """
  mutation AcceptEmailVerification($accountUserEmail: String!, $verificationCode: String!) {
    acceptEmailVerification(accountUserEmail: $accountUserEmail, verificationCode: $verificationCode) {
      isVerificationAccepted
    }
  }
  """

  @send_sms_verification """
  mutation SendSmsVerification($phoneNumber: String!) {
    sendSmsVerification(phoneNumber: $phoneNumber) {
      isVerificationSent
    }
  }
  """

  @accept_sms_verification """
  mutation AcceptSmsVerification($phoneNumber: String!, $verificationCode: String!) {
    acceptSmsVerification(phoneNumber: $phoneNumber, verificationCode: $verificationCode) {
      isVerificationAccepted
    }
  }
  """

  describe "@sendEmailVerification" do
    test "with a existing account user id returns %{isVerificationSent: true}" do
      user = EctoSchemas.Factory.insert!(:accounts_user)

      res = Absinthe.run(@send_email_verification, WebApi.Schema, variables: %{
        "accountUserEmail" => user.email
      })

      assert {:ok, %{data: %{"sendEmailVerification" => verification_res}}} = res
      assert %{"isVerificationSent" => true} = verification_res
    end
  end

  describe "@acceptEmailVerification" do
    test "accepts a email an verification code and returns %{isVerificationAccepted: true}" do
      user = EctoSchemas.Factory.insert!(:accounts_user)

      {:ok, code} = AccountVerification.send_email_verification(user.email)

      res = Absinthe.run(@accept_email_verification, WebApi.Schema, variables: %{
        "accountUserEmail" => user.email,
        "verificationCode" => code
      })

      assert {:ok, %{data: %{"acceptEmailVerification" => verification_res}}} = res
      assert %{"isVerificationAccepted" => true} = verification_res
    end
  end

  describe "@sendSmsVerification" do
    test "sends a code to a phone number and returns %{isVerificationSent: true}" do
      res = Absinthe.run(@send_sms_verification, WebApi.Schema, variables: %{
        "phoneNumber" => @test_phone_number
      })

      assert {:ok, %{data: %{"sendSmsVerification" => verification_res}}} = res
      assert %{"isVerificationSent" => true} = verification_res
    end
  end

  describe "@acceptSmsVerification" do
    test "accepts a phone number and code and returns %{isVerificationAccepted: true}" do
      {:ok, code} = AccountVerification.send_sms_verification(@test_phone_number)

      res = Absinthe.run(@accept_sms_verification, WebApi.Schema, variables: %{
        "phoneNumber" => @test_phone_number,
        "verificationCode" => code
      })

      assert {:ok, %{data: %{"acceptSmsVerification" => verification_res}}} = res
      assert %{"isVerificationAccepted" => true} = verification_res
    end
  end
end
