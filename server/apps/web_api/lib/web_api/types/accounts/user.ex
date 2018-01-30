defmodule WebApi.Types.Accounts.User do
  @moduledoc false

  use Absinthe.Schema.Notation

  import WebApi.Types.ScalarTypes, only: [timestamp_types: 0]

  object :account_user do
    field :id, :id
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :age, :integer
    field :phone_number, :string
    field :is_email_verified, :boolean

    timestamp_types
  end

  input_object :account_user_input do
    field :full_name, non_null(:string)
    field :email, non_null(:string)
    field :age, non_null(:integer)
    field :phone_number, non_null(:string)
    field :password, non_null(:string)
  end
end
