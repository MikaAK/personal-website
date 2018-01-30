defmodule WebApi.Router do
  use WebApi, :router

  pipeline :graphql do
    plug WebApi.Context
  end

  scope "/" do
    pipe_through :graphql

    forward "/graphql", Absinthe.Plug,
      schema: WebApi.Schema
      # max_complexity: @max_complexity,
      # analyze_complexity: true

    if Mix.env() === :dev do
      forward "/graphiql", Absinthe.Plug.GraphiQL,
        schema: WebApi.Schema,
        socket: WebApi.UserSocket,
        interface: :playground
        # max_complexity: @max_complexity,
        # analyze_complexity: true
    end
  end
end
