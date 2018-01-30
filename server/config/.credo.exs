%{
  configs: [%{
    name: "default",
    color: true,
    checks: [
      {Credo.Check.Readability.ModuleDoc, false}
    ],
    files: %{
      included: ["lib/", "src/", "apps/", "rel/"],
      excluded: []
    },
  }]
}
