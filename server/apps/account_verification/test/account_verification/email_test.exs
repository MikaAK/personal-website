defmodule AccountVerificationEmailTest do
  use AccountVerification.DataCase, async: true

  describe "#create_verification_code" do
    test "returns ok when user is valid" do
      user = EctoSchemas.Factory.insert!(:accounts_user, is_email_verified: false)

      assert {:ok, _} = AccountVerification.Email.create_verification_code(user.email)
    end

    test "returns error if params are invalid" do
      user = EctoSchemas.Factory.insert!(:accounts_user, is_email_verified: true)

      assert {:error, _} = AccountVerification.Email.create_verification_code(user.email)
      assert {:error, _} = AccountVerification.Email.create_verification_code("someEmail@gmail.com")
    end
  end

  describe "#accept_verification_code" do
    test "updates a user to is_email_verified true" do
      user = EctoSchemas.Factory.insert!(:accounts_user, is_email_verified: false)

      assert :ok = AccountVerification.Email.accept_verification_code(user.email)
      assert true === EctoSchemas.Accounts.get_user(user.id).is_email_verified
    end
  end
end
