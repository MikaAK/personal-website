defmodule WebApi.Types.Verification do
  @moduledoc false

  use Absinthe.Schema.Notation

  object :sent_verification do
    field :is_verification_sent, :boolean
  end

  object :accepted_verification do
    field :is_verification_accepted, :boolean
  end
end
