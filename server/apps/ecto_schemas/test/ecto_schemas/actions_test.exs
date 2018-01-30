defmodule EctoSchemasActionsTest do
  use EctoSchemas.DataCase, async: true

  doctest EctoSchemas.Actions

  def create_user, do: EctoSchemas.Factory.insert!(:account_user)

  def user_params(params \\ %{})
  def user_params(params) when is_list(params), do: user_params(Map.new(params))

  def user_params(params) do
    :account_user
      |> EctoSchemas.Factory.build_params
      |> Map.put(:password, "password1234")
      |> Map.merge(params)
  end
end
