defmodule WebApiMiddlewareAuthTest do
  use WebApi.DataCase, async: true

  alias EctoSchemas.Factory

  defmodule Schema do
    use Absinthe.Schema

    object :user do
      field :name, :string
    end

    query do
      field :authenticated, :user do
        middleware WebApi.Middleware.Auth

        resolve fn _, _, _ ->
          {:ok, %{name: "bob"}}
        end
      end
    end
  end

  setup do
    UserSession.start_link

    :ok
  end

  test "if user session is inactive or invalid returns causes a schema to error" do
    doc = "query {authenticated {name}}"

    current_user = Factory.insert!(:accounts_user)

    UserSession.activate_session(current_user.id)

    assert {:ok, %{errors: [%{message: "unauthenticated"}]}} = Absinthe.run(doc, __MODULE__.Schema)
    assert {:ok, %{errors: [%{message: "user token is not active"}]}} = Absinthe.run(doc, __MODULE__.Schema, [
      context: %{current_user: Factory.insert!(:accounts_user), token: "TEST_TOKEN"}
    ])
    assert {:ok, %{errors: [%{message: "user token is not active"}]}} = Absinthe.run(doc, __MODULE__.Schema, [
      context: %{current_user: current_user, token: "SOME_DIFFERENT_TOKEN"}
    ])
  end

  test "if user session is active schema succeeds" do
    doc = "query {authenticated {name}}"
    current_user = Factory.insert!(:accounts_user)

    {:ok, {token, _}} = UserSession.activate_session(current_user.id)

    assert {:ok, %{data: res}} = Absinthe.run(doc, __MODULE__.Schema, context: %{current_user: current_user, token: token})
    assert %{"authenticated" => %{"name" => "bob"}} = res
  end
end
