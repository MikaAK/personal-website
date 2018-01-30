defmodule SmsSender.Helpers do
  @moduledoc false

  @twilio_headers [{"Content-Type", "application/x-www-form-urlencoded"}]

  def create_request(phone_number, message) do
    with {:ok, %{body: body}} <- HTTPoison.post(
      twilio_url(),
      {:form, create_params(phone_number, message, twilio_messaging_sid())},
      @twilio_headers,
      http_basic_auth()
    ) do
      deserialize_request(body)
    end
  end

  defp deserialize_request(body) do
    with {:ok, data} <- Poison.decode(body, keys: :atoms) do

      if is_nil(Map.get(data, :error_code)) && is_nil(Map.get(data, :code)) do
        {:ok, data}
      else
        {:error, data}
      end
    end
  end

  defp create_params(phone_number, message, message_sid) do
    params = [
      "To": serialize_phone_number(phone_number),
      "From": serialize_phone_number(twilio_number()),
      "Body": message
    ]

    if message_sid do
      [{"MessagingServiceSid", message_sid} | params]
    else
      params
    end
  end

  defp serialize_phone_number(phone_number), do: "+1#{String.replace(phone_number, ~r/\D/, "")}"
  defp http_basic_auth, do: [hackney: [basic_auth: {twilio_account_sid(), twilio_auth_token()}]]
  defp twilio_account_sid, do: Application.get_env(:sms_sender, :twilio_account_sid)
  defp twilio_number, do: Application.get_env(:sms_sender, :twilio_number)
  defp twilio_messaging_sid, do: Application.get_env(:sms_sender, :twilio_messaging_sid, nil)
  defp twilio_auth_token, do: Application.get_env(:sms_sender, :twilio_account_token)
  defp twilio_url, do: "https://api.twilio.com/2010-04-01/Accounts/#{twilio_account_sid()}/Messages.json"
end
