defmodule AccountVerification.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      Supervisor.child_spec(
        {AccountVerification.VerificationServer, [{:email, AccountVerification.Email}]},
        id: :email_verification_server
      ),

      Supervisor.child_spec(
        {AccountVerification.VerificationServer, [{:sms, AccountVerification.Sms}]},
        id: :sms_verification_server
      )
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AccountVerification.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
