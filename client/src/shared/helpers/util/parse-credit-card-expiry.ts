export const parseCreditCardExpiry = (expiry: string) => {
  const [, month, year] = expiry.match(/(\d{2})(?:\/|-)(\d{2})/)

  return {
    expiryMonth: month,
    expiryYear: year
  }
}
