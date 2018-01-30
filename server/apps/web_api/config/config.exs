# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :web_api,
  namespace: WebApi,
  ecto_repos: [EctoSchemas.Repo],
  generators: []

# Configures the endpoint
config :web_api, WebApi.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "0tgL8sJSK5NB5NUR5/cFQT8DDi2iMh/vpDM0/blZN9jjdRZbbVKdOXO/lg1wQ6g1",
  render_errors: [view: WebApi.ErrorView, accepts: ~w(json)],
  pubsub: [name: WebApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :web_api, :generators,
  context_app: :ecto_schemas

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
