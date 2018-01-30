defmodule WebApiMiddlewareChangesetErrorFormatterTest do
  use WebApi.DataCase, async: true

  defmodule Schema do
    @test_plain_text_error "testing"

    use Absinthe.Schema

    object :user do
      field :full_name, :string
    end

    query do
      field :user, :user do
      end
    end

    mutation do
      field :create_user_changeset_fail, :user do

        resolve fn _, _, _ ->
          user = %{age: 14}
            |> EctoSchemas.Accounts.User.create_changeset
            |> Ecto.Changeset.add_error(:password, "has some weird error")

          {:error, user}
        end
      end

      field :create_user_plain_text_fail, :user do
        resolve fn _, _, _ ->
          {:error, @test_plain_text_error}
        end
      end
    end

    def middleware(middleware, _field, %{identifier: :mutation}) do
      middleware ++ [WebApi.Middleware.ChangesetErrorFormatter]
    end

    def middleware(middleware, _, _) do
      middleware
    end
  end

  @test_plain_text_error "testing"

  test "if errors other than a changeset are returned returns errors" do
    doc = "mutation { createUserPlainTextFail {fullName}}"

    assert {:ok, %{errors: [%{message: message}]}} = Absinthe.run(doc, __MODULE__.Schema)
    assert message === @test_plain_text_error
  end

  test "if a changeset is returned as an error keyword returns the errors properly" do
    doc = "mutation { createUserChangesetFail {fullName}}"

    assert {:ok, %{errors: errors}} = Absinthe.run(doc, __MODULE__.Schema)
    assert Enum.find_value(errors, &(&1.message === "age must be older than 18"))
    assert Enum.find_value(errors, &(&1.message === "password has some weird error"))
  end
end
