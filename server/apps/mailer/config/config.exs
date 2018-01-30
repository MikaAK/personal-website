# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

if Mix.env() === :prod do
  config :mailer, Mailer,
    adapter: Swoosh.Adapters.Mailgun,
    api_key: "${MAILGUN_API_KEY}",
    domain: "samacare.net"
else
  config :mailer, Mailer,
    adapter: Swoosh.Adapters.Local
end
