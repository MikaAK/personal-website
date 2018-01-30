use Mix.Config

config :ecto_schemas, EctoSchemas.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: "${DB_URL}",
  pool_size: 20
