defmodule WebApiSchemaAccountsQueriesTest do
  use WebApi.ConnCase

  alias EctoSchemas.{Factory, Accounts, PainEducation}

  setup do
    user = Factory.insert!(:accounts_user)
    user2 = Factory.insert!(:accounts_user)

    {:ok, %{user: user, user2: user2}}
  end

  describe "@accountUser" do
    test "returns single account user", %{user: user} do
      doc = """
      query {
        accountUser(id: #{user.id}) {
          id
        }
      }
      """

      assert {:ok, %{data: %{"accountUser" => res_user}}} = Absinthe.run(doc, WebApi.Schema)
      assert res_user["id"] === Integer.to_string(user.id)
    end
  end

  describe "@accountUsers" do
    test "returns list of account users", %{user: user, user2: user2} do
      doc = """
      query AccountsUsersQuery($ids: [ID]) {
        accountsUsers(ids: $ids) {
          id
        }
      }
      """

      variables = %{
        "ids" => Enum.map([user.id, user2.id], &Integer.to_string/1)
      }

      assert {:ok, %{data: data}} = Absinthe.run(doc, WebApi.Schema, variables: variables)
      assert %{"accountsUsers" => res_users} = data
      assert [%{"id" => user_id}, %{"id" => user2_id}] = res_users
      assert user_id === Integer.to_string(user.id)
      assert user2_id === Integer.to_string(user2.id)
    end
  end

  describe "@me" do
    test "returns current account user", %{user: user} do
      doc = "query { me { id } }"

      {:ok, {token, _}} = UserSession.activate_session(user.id)

      assert {:ok, %{data: %{"me" => me_user}}} = Absinthe.run(doc, WebApi.Schema, context: %{current_user: user, token: token})
      assert me_user["id"] === Integer.to_string(user.id)
    end
  end
end
