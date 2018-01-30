defmodule Helpers.Date do
  @moduledoc """
  Helpers that involve dates should go here
  """

  @spec naive_is_after_now(NaiveDateTime.t) :: boolean
  @doc """
  Returns a boolean based off if the current time is before the given time

  ## Examples

      iex> Helpers.Date.naive_is_after_now(NaiveDateTime.utc_now() |> NaiveDateTime.add(10000, :second))
      true
      iex> Helpers.Date.naive_is_after_now(NaiveDateTime.utc_now() |> NaiveDateTime.add(-1000, :second))
      false
  """
  def naive_is_after_now(naive_date_time) do
    NaiveDateTime.diff(NaiveDateTime.utc_now(), naive_date_time) < 0
  end

  @spec datetime_is_after_now(DateTime.t) :: boolean
  @doc """
  Returns a boolean based off if the current time is before the given time

  ## Examples

      iex> Helpers.Date.datetime_is_after_now(create_future_date_time())
      true
      iex> Helpers.Date.datetime_is_after_now(create_past_date_time())
      false
  """
  def datetime_is_after_now(date_time) do
    DateTime.diff(DateTime.utc_now(), date_time) < 0
  end
end
