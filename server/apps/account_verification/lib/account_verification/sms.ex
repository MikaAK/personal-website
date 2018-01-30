defmodule AccountVerification.Sms do
  @moduledoc false
  @behaviour AccountVerification.VerificationBehaviour

  def create_verification_code(phone_number) do
    code = Helpers.random_nums_string(3) <> " " <> Helpers.random_nums_string(3)
    send_text_task = Task.async(fn -> send_text(phone_number, code) end)

    with {:ok, _} <- Task.await(send_text_task, :timer.seconds(10)) do
      {:ok, code}
    end
  end

  def accept_verification_code(_) do
    :ok
  end

  defp send_text(phone_number, code), do: SmsSender.send_text(phone_number, sms_message_content(code))
  defp sms_message_content(code), do: "Samacare verification code: #{code}"
end
