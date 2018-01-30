use Mix.Config

config :logger, level: :warn

config :ecto_schemas, EctoSchemas.Repo,
  adapter: Ecto.Adapters.Postgres,
  pool: Ecto.Adapters.SQL.Sandbox,
  database: "myapp_test",
  username: "postgres",
  hostname: "localhost"
