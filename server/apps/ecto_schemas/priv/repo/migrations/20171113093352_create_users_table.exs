defmodule EctoSchemas.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    # execute "CREATE EXTENSION IF NOT EXISTS citext"

    create table(:accounts_users) do
      add :first_name, :text, null: false
      add :last_name, :text, null: false
      add :email, :text, null: false
      add :password_hash, :text, null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:accounts_users, [:email])
  end
end
