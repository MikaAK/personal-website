export class NoInputIdForFormField extends Error {
  constructor(formLabel = '') {
    super(`ID field not found for ${formLabel} input under form-field`)
  }
}

export class NoInputForFormField extends Error {
  constructor(formLabel = '') {
    super(`No matInput or other supported forms of input were found ${formLabel}`)
  }
}
