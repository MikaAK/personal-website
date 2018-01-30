defmodule WebApiSchemaSessionMutationsTest do
  use WebApi.ConnCase, async: true

  alias EctoSchemas.Factory

  @logout_doc """
  mutation {
    logout {
      isLoggedOut
    }
  }
  """

  @login_doc """
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accountUser {
        id
      }
      sessionInfo {
        token
        expiry
      }
    }
  }
  """

  describe "@login" do
    test "with correct parameters returns sessionInfo and user" do
      user = Factory.insert!(:accounts_user)

      user_id = Integer.to_string(user.id)
      res = Absinthe.run(@login_doc, WebApi.Schema, variables: %{
        "email" => user.email,
        "password" => "test1234"
      })

      assert {:ok, %{data: %{"login" => login_res}}} = res
      assert %{"sessionInfo" => %{
        "token" => _,
        "expiry" => _
      }} = login_res

      assert %{"accountUser" => %{"id" => ^user_id}} = login_res
    end

    test "with wrong password returns errors" do
      user = Factory.insert!(:accounts_user)

      res = Absinthe.run(@login_doc, WebApi.Schema, variables: %{
        "email" => user.email,
        "password" => "password12334323"
      })

      assert {:ok, %{errors: [%{message: "Your password is incorrect"}]}} = res
    end

    test "with wrong email returns errors" do
      res = Absinthe.run(@login_doc, WebApi.Schema, variables: %{
        "email" => "wadf@asdf.ca",
        "password" => "password12334"
      })

      assert {:ok, %{errors: [%{message: "no user with that email exists"}]}} = res
    end
  end

  describe "@logout" do
    test "returns isLoggedOut: true" do
      user = Factory.insert!(:accounts_user)
      {:ok, {token, _exp}} = UserSession.activate_session(user.id)

      res = Absinthe.run(@logout_doc, WebApi.Schema, context: %{
        current_user: user,
        token: token
      })

      assert {:ok, %{data: %{"logout" => %{"isLoggedOut" => true}}}} = res
    end
  end
end
