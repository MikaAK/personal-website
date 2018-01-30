defmodule AccountVerification.Mixfile do
  use Mix.Project

  def project do
    [
      app: :account_verification,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.5",
      elixirc_paths: elixirc_paths(Mix.env),
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {AccountVerification.Application, {}},
      extra_applications: [:logger, :crypto]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:sms_sender, in_umbrella: true},
      {:mailer, in_umbrella: true},
      {:helpers, in_umbrella: true},
      {:ecto_schemas, in_umbrella: true}
    ]
  end
end
