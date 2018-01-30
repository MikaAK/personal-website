# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

if Mix.env() === :prod do
  config :sms_sender,
    twilio_number: "${TWILIO_NUMBER}",
    twilio_account_sid: "${TWILIO_ACCOUNT_SID}",
    twilio_account_token: "${TWILIO_ACCOUNT_TOKEN}",
    twilio_messaging_sid: "${TWILIO_MESSAGING_SID}"
else
  config :sms_sender,
    twilio_number: "5005550006",
    twilio_account_sid: "AC5e9d466c1debcd247fc76c39eac44b51",
    twilio_account_token: "6bc7892d14fc6d432b0d68b56e0a609c"
end
