FROM elixir:1.5-alpine

WORKDIR /home

# Add mix files
COPY ./server/config/* ./config/
COPY ./server/apps/api/mix.exs ./apps/api/

COPY ./server/apps/web_api/config ./apps/web_api/config
COPY ./server/apps/web_api/config ./apps/web_api/config

COPY ./server/apps/helpers/config ./apps/helpers/config
COPY ./server/apps/helpers/config ./apps/helpers/config

COPY ./server/apps/ecto_schemas/mix.exs ./apps/ecto_schemas/
COPY ./server/apps/ecto_schemas/config ./apps/ecto_schemas/config

COPY ./server/apps/sms_sender/mix.exs ./apps/sms_sender/
COPY ./server/apps/sms_sender/config ./apps/sms_sender/config

COPY ./server/apps/mailer/mix.exs ./apps/mailer/
COPY ./server/apps/mailer/config ./apps/mailer/config

COPY ./server/apps/account_verification/mix.exs ./apps/account_verification/
COPY ./server/apps/account_verification/config ./apps/account_verification/config

COPY ./server/apps/user_session/mix.exs ./apps/user_session/
COPY ./server/apps/user_session/config ./apps/user_session/config

COPY ./server/mix.exs server/mix.lock ./

RUN mix do deps.get, compile

RUN rm -rf ./apps
COPY ./server/rel ./rel
COPY ./server/apps ./apps

# Install Deps and Release
RUN rm -rf {deps,_build} && mix do deps.get, phx.digest, release --env=prod

# For Build split
# COPY ./server.tar.gz ./
# RUN ["tar", "xzf", "server.tar.gz"]
# ENTRYPOINT ["/home/bin/server"]
# CMD ["foreground"]

ENV PORT 4000
ENV REPLACE_OS_VARS true
EXPOSE 4000

ENTRYPOINT ["/home/_build/prod/rel/server/bin/server"]
CMD ["foreground"]
