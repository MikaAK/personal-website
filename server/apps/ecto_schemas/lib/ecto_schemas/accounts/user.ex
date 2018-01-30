defmodule EctoSchemas.Accounts.User do
  use EctoSchemas

  schema "accounts_users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps(type: :utc_datetime)
  end

  @required_fields [:email, :first_name, :last_name]
  @allowed_fields Enum.concat(@required_fields, [:password])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(%__MODULE__{} = user, params \\ %{}) do
    user
      |> cast(params, @allowed_fields)
      |> validate_required(@required_fields)
      |> unique_constraint(:email, name: :accounts_users_email_index)
      |> validate_length(:password, min: 3, max: 100)
      |> put_password
  end

  def create_changeset(params), do: changeset(%__MODULE__{}, params)

  defp put_password(changeset) do
    password = changeset.params["password"]

    if password && changeset.valid? do
      password_hash = Comeonin.Argon2.hashpwsalt(password)

      put_change(changeset, :password_hash, password_hash)
    else
      changeset
    end
  end
end
