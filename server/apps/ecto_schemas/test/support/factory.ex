defmodule EctoSchemas.Factory do
  @moduledoc """
  This module is for schema data generation. It allows you to insert and build data from everywhere
  """

  alias EctoSchemas.Repo

  # Factories
  def build(:account_user) do
    %EctoSchemas.Accounts.User{}
      |> struct(build_params(:account_user))
  end

  def build_params(:account_user) do
    %{
      full_name: Faker.Name.name(),
      email: Faker.Internet.free_email(),
      age: random_num(18, 100),
      phone_number: Faker.Phone.EnUs.phone(),
      is_tos_accepted: true,
      pain_info_cause: :MOTOR_VEHICLE_ACCIDENT,
      pain_info_duration: :TEN_OR_MORE_YEARS,
      password_hash: Comeonin.Argon2.hashpwsalt("password1234"),
      pain_info_locations: Enum.take_random([
        :HEAD,
        :NECK,
        :SHOULDERS,
        :ARMS,
        :CHEST,
        :TORSO,
        :BACK,
        :LEGS,
        :FEET
      ], 3)
    }
  end

  def params(_), do: %{}

  # Convenience API
  def build(factory_name, attributes) do
    factory_name |> build() |> struct(attributes)
  end

  def insert!(factory_name, attributes \\ []) do
    Repo.insert! build(factory_name, attributes)
  end

  # defp random_num(max), do: random_num(1, max)
  defp random_num(min, max) do
    rand = :rand.uniform(max)

    if rand < min do
      random_num(min, max)
    else
      rand
    end
  end
end
