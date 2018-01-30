defmodule WebApiSchemaAccountsMutationsTest do
  use WebApi.ConnCase, async: true

  @create_user_doc """
  mutation CreateAccountUser($accountUser: AccountUserInput!) {
    createAccountUser(accountUser: $accountUser) {
      id
      fullName
    }
  }
  """

  describe "@createAccountUser" do
    test "creates a new accountUser if input is valid" do
      name = Faker.Name.name()
      res = Absinthe.run(@create_user_doc, WebApi.Schema, variables: user_input(name))

      assert {:ok, %{data: %{"createAccountUser" => user}}} = res
      assert %{"fullName" => ^name} = user
    end

    test "returns errors for accountUser if input is invalid" do
      res = Absinthe.run(
        @create_user_doc,
        WebApi.Schema,
        variables: put_in(user_input(), ["accountUser", "password"], "test")
      )

      assert {:ok, %{errors: [%{message: message}]}} = res
      assert message === "password should be at least 8 character(s)"
    end
  end

  defp user_input(name \\ Faker.Name.name()) do
    %{
      "accountUser" => %{
        "fullName" => name,
        "email" => Faker.Internet.free_email(),
        "age" => 23,
        "phoneNumber" => Faker.Phone.EnUs.phone(),
        "painInfoCauses" => ["MOTOR_VEHICLE_ACCIDENT"],
        "painInfoDuration" => "TEN_OR_MORE_YEARS",
        "password" => "testing1234",
        "painInfoLocations" => ["HEAD"]
      }
    }
  end
end
