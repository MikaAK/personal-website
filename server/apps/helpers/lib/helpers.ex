defmodule Helpers do
  @moduledoc """
  Generic helpers that can't be catagorized go here
  """

  @spec map_of(map, Map.key) :: Map.value
  @doc """
  Returns a boolean based off if the current time is before the given time

  ## Examples

      iex> Helpers.map_of("test", :item)
      %{item: "test"}
      iex> Helpers.map_of("tim", "test")
      %{"test" => "tim"}
  """
  def map_of(item, name), do: Map.put(%{}, name, item)

  @spec pluck(list, String.t | atom) :: list
  @doc """
  Plucks a prop off a list of maps

  ## Examples

      iex> Helpers.pluck([%{id: 5}, %{id: 4}], :id)
      [5, 4]
  """
  def pluck(items, prop), do: Enum.map(items, &Map.get(&1, prop))

  @spec random_nums(non_neg_integer) :: list(non_neg_integer)
  @doc """
  Returns a array of random numbers

  ## Examples

      iex> length(Helpers.random_nums(5)) === 5
      true
  """
  def random_nums(number), do: Enum.map(1..number, fn (_) -> :rand.uniform(10) - 1 end)

  def random_nums_string(number), do: number |> random_nums |> Enum.join
end
