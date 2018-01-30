defmodule WebApi.Types.SharedArgs do
  @moduledoc """
  This module contains macros that are args for multiple mutations/queries
  since you cannot import_fields or similar with args
  """

  defmacro find_resolver_args do
    quote do
      arg :start_date, :datetime
      arg :end_date, :datetime
      arg :before, :integer
      arg :after, :integer
      arg :first, :integer
      arg :last, :integer
    end
  end

  defmacro all_resolver_args do
    quote do
      arg :start_date, :datetime
      arg :end_date, :datetime
      arg :before, :integer
      arg :after, :integer
      arg :ids, list_of(:id)
      arg :first, :integer
      arg :last, :integer
    end
  end
end
