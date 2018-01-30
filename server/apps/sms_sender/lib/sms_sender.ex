defmodule SmsSender do
  @moduledoc """
  Module to send SMS messages via twillio
  """

  import Logger, only: [info: 2]

  @spec send_text(phone_number :: String.t, message :: String.t) :: {:ok | :error, map}
  @doc """
  Sends a text message to a given phone number

  ## Examples

      iex> {:ok, %{body: body, to: to, status: status}} = SmsSender.send_text("6044414527", "Hi")
      iex> {status, to, body}
      {"queued", "+16044414527", "Hi"}
  """
  def send_text(phone_number, message) do
    info("Sending text message", to_number: phone_number, sms_content: message)

    SmsSender.Helpers.create_request(phone_number, message)
  end
end
