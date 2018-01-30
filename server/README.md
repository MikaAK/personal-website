# MyApp.Umbrella

This app is organized for large applications
There are 3 different apps to be aware of.

### `ecto_schemas`
This app handles ecto schemas and should be the place all of them are organized.
Context based organization is prefered for example instead of using just a `user` table you could have
`accounts_user`

### `helpers`
This app handles helpers. Preference for organzing by type is prefered. EG
`Helpers.Date.is_before` for example

### `web_api`
This contains the phoenix app used with absinthe. This is organised into different folders:

- `resolvers` - context based resolvers so `accounts_user = Resolvers.AccountsUser` for example
- `middleware` - middleware for absinthe
- `schema` - split into queries/mutations, use objects and import them into the main `schema.ex` file
- `types` - split into folders of context with type files, `types/accounts/user.ex` for example. `scalar_types.ex` contains custom types

# Important Prod ENV variables
With the usage of these environment variables and `REPLACE_OS_VARS` we can eliminate the need for `.secret.exs` files

- `API_SECRET_KEY_BASE` - use `mix phx.gen.secret` and set the environment variable to the result
- `DB_URL` - DB Url for database
- `JOKEN_SECRET_KEY` - use `mix phx.gen.secret` and set the environment variable to the result
