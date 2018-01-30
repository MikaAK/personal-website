defmodule HelpersDateTest do
  use ExUnit.Case, async: true
  doctest Helpers.Date

  def create_future_date_time, do: NaiveDateTime.utc_now()
    |> NaiveDateTime.add(1000, :second)
    |> DateTime.from_naive!("Etc/UTC")

  def create_past_date_time, do: NaiveDateTime.utc_now()
    |> NaiveDateTime.add(-1000, :second)
    |> DateTime.from_naive!("Etc/UTC")
end
