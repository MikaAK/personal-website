# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :user_session,
  token_valid_duration: :timer.hours(24),
  token_valid_duration_amount: :second

if Mix.env() === :prod do
  config :user_session, joken_secret: "${JOKEN_SECRET_KEY}"
else
  config :user_session, joken_secret: "6TdNl9GdonOphRWPsAcHq6xFouM0enWuYihlwTXSNoV27bcuYOW28v5+9vfHZte8"
end
