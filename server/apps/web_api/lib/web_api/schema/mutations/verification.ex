defmodule WebApi.Schema.Mutations.Verification do
  @moduledoc false

  use Absinthe.Schema.Notation

  alias WebApi.Resolvers

  object :verification_mutations do
    field :send_email_verification, :sent_verification do
      arg :account_user_email, :string

      resolve &Resolvers.Verification.send_email_verification/2
    end

    field :accept_email_verification, :accepted_verification do
      arg :account_user_email, :string
      arg :verification_code, :string

      resolve &Resolvers.Verification.accept_email_verification/2
    end

    field :send_sms_verification, :sent_verification do
      arg :phone_number, :string

      resolve &Resolvers.Verification.send_sms_verification/2
    end

    field :accept_sms_verification, :accepted_verification do
      arg :phone_number, :string
      arg :verification_code, :string

      resolve &Resolvers.Verification.accept_sms_verification/2
    end
  end
end
