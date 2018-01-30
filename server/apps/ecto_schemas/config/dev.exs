use Mix.Config

config :ecto_schemas, EctoSchemas.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "myapp_dev",
  username: "postgres",
  hostname: "localhost",
  pool_size: 10
