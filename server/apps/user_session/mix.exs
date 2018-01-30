defmodule UserSession.Mixfile do
  use Mix.Project

  def project do
    [
      app: :user_session,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.5",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {UserSession.Application, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:joken, "~> 1.5.0"},
      {:poison, "~> 3.1.0"},
      {:helpers, in_umbrella: true},
      {:ecto_schemas, in_umbrella: true}
    ]
  end
end
