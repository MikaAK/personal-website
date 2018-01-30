defmodule Helpers.String do
  @moduledoc """
  Module for string related helpers
  """

  def remove_spaces(string), do: String.replace(string, " ", "")
end
