defmodule AccountVerification.Email do
  alias EctoSchemas.{Accounts, Accounts.User}

  @moduledoc false
  @behaviour AccountVerification.VerificationBehaviour

  @email_subject "Email Verification"
  @redirect_location Application.get_env(:account_verification, :email_verification_url)

  def create_verification_code(email) do
    with {:ok, user} <- Accounts.find_user(email: email),
         false <- user.is_email_verified do
      create_and_send_code_email(user)
    else
      true -> {:error, "#{email} has already been verified"}
      _ -> {:error, "Sorry, #{email} is not an email we have on file"}
    end
  end

  def accept_verification_code(email) do
    with {:ok, user} <- Accounts.find_user(email: email),
         {:ok, _} <- Accounts.update_user(user, %{is_email_verified: true}) do
      :ok
    end
  end

  defp create_and_send_code_email(user) do
    verification_code = :sha
      |> :crypto.hash(user.email <> NaiveDateTime.to_string(NaiveDateTime.utc_now()))
      |> Base.encode16

    send_email_task = Task.async(fn -> send_email(user, verification_code) end)

    with {:ok, _} <- Task.await(send_email_task, :timer.seconds(10)) do
      {:ok, verification_code}
    end
  end

  defp send_email(%User{email: email} = user, verification_code) do
    Mailer.send_email(email, @email_subject, email_content(user, verification_code))
  end

  defp email_content(%User{email: email, first_name: first_name, last_name: last_name}, code) do
    url = "#{@redirect_location}?verificationCode=#{code}&email=#{email}"

    """
    <span style='display: block; margin-top: 30px;'>Dear #{first_name} #{last_name},</span>

    <span style='display: block; margin-top: 40px;'>
      Thanks for signing up for SamaCare's chronic pain program!
    </span>

    <span style='display: block; margin-top: 5px;'>
      To confirm that you signed up from the email address #{email}, please <a href='#{url}'>click on this link</a>:
      <pre>#{url}</pre>
    </span>

    <span style='display: block; margin-top: 40px;'>
      If you did not sign up for this service, you can ignore this email.
    </span>

    <span style='display: block; margin-top: 5px;'>
      Best,
    </span>
    <span style='display: block; margin-top: 25px;'>
      The SamaCare team
    </span>
    """
  end
end
