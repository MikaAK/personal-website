defmodule Mailer do
  @moduledoc """
  Mailer module to send emails
  """

  use Swoosh.Mailer, otp_app: :mailer, only: [deliver: 1]

  import Logger, only: [info: 2]

  alias Swoosh.Email

  @from_name "Samacare"
  @from_email "noreply@samacare.net"

  @spec send_email(to :: String.t, subject :: String.t, body :: String.t) :: {:ok | :error, map}
  def send_email(to, subject, body), do: send_email(to, subject, body, body)

  @spec send_email(to :: String.t, subject :: String.t, body :: String.t, text_body :: String.t) :: {:ok | :error, map}
  def send_email(to, subject, body, text_body) do
    info "Sending email", email_subject: subject, to_email: to

    Email.new()
      |> Email.to(to)
      |> Email.from({@from_name, @from_email})
      |> Email.subject(subject)
      |> Email.html_body(body)
      |> Email.text_body(text_body)
      |> deliver
  end
end
