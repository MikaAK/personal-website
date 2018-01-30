defmodule AccountVerificationVerificationImplTest do
  use ExUnit.Case, async: true

  alias AccountVerification.VerificationImpl

  defmodule TestVerification do
    def create_verification_code(identifier) do
      {:ok, identifier <> "_created"}
    end

    def accept_verification_code(identifier) do
      {:ok, identifier <> "_accepted"}
    end
  end

  defmodule TestErrorVerification do
    def create_verification_code(identifier) do
      {:error, identifier <> "_create_error"}
    end

    def accept_verification_code(_) do
      {:error, ""}
    end
  end

  @test_id "test"

  describe "#create_verification_code" do
    test "calls verification_module.create_verification_code and adds to state under identifier" do
      assert {{:ok, res}, state} = VerificationImpl.create_verification_code(%{}, TestVerification, @test_id)
      assert "test_created" === res
      assert Map.get(state, @test_id) === res
    end
  end

  describe "#check_verification_code" do
    test "returns result of verification_module.accept_verification_code if is correct" do
      code = "BOB"
      state = Map.new([{@test_id, code}])

      assert {{:ok, res}, state} = VerificationImpl.check_verification_code(state, TestVerification, @test_id, code)
      assert {{:error, _}, _} = VerificationImpl.check_verification_code(state, TestVerification, @test_id, "non-code")
      assert "test_accepted" === res
      assert state === %{}
    end

    test "returns :error if verification code is wrong" do
      assert {{:error, error}, _} = VerificationImpl.check_verification_code(%{}, TestVerification, @test_id, "test")
      assert Regex.match?(~r/No.*found.*#{@test_id}/, error)
    end
  end
end
