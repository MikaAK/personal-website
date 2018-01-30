# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

cond do
  System.get_env("IS_STAGING") ->
    config :account_verification,
      email_verification_url: "http://staging.app.samacare.net/email-verification"

  Mix.env() === :prod ->
    config :account_verification,
      email_verification_url: "https://app.samacare.net/email-verification"

  true ->
    config :account_verification,
      email_verification_url: "http://localhost:3000/email-verification"
end
