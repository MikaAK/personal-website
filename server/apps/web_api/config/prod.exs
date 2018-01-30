use Mix.Config

config :web_api, WebApi.Endpoint,
  load_from_system_env: true,
  check_origin: ["//example.com"],
  secret_key_base: "${API_SECRET_KEY_BASE}",
  server: true

config :web_api, host_origins: ["//example.com"]
