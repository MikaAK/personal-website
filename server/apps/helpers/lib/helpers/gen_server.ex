defmodule Helpers.GenServer do
  @moduledoc """
  Helpers module for genserver common functions
  """

  @doc """
  Wraps {res, state} into {:reply, res, state}

  ## Examples

      iex> Helpers.GenServer.reply({"test", %{state: 1}})
      {:reply, "test", %{state: 1}}
  """
  def reply({res, state}), do: {:reply, res, state}
end
