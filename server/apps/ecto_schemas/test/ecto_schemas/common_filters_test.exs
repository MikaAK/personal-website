defmodule EctoSchemasCommonFiltersTest do
  use ExUnit.Case, async: true
  alias EctoSchemas.{CommonFilters, Accounts.User}

  test "converts a keyword list to query" do
    assert location_filter([full_name: "TEST"]) === expected_location_query(%{full_name: "TEST"})
  end

  test "converts known properties of a schema into a filter" do
    expected_query = expected_location_query(%{full_name: "test"})

    assert location_filter(%{full_name: "test"}) === expected_query
    assert location_filter(%{full_name: "test", unknown_field: "bob"}) === expected_query
  end

  defp location_filter(params) do
    User |> CommonFilters.convert_params_to_filter(params) |> inspect
  end

  defp expected_location_query(res_expect, order_expect \\ "[asc: u.id]") do
    "#Ecto.Query<from u in EctoSchemas.Accounts.User#{generate_where_query(res_expect)}, order_by: #{order_expect}>"
  end

  defp generate_where_query(res_expect) do
    res_expect
      |> Map.to_list
      |> Enum.reduce("", fn {key, value}, acc ->
        acc <> ", where: u.#{key} == ^#{inspect value}"
      end)
  end
end
