# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :ecto_schemas, ecto_repos: [EctoSchemas.Repo]

import_config "#{Mix.env}.exs"
