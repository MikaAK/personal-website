import {test, compose, prop, always, ifElse} from 'ramda'

// Taken from https://developers.google.com/web/fundamentals/design-and-ux/input/forms
// tslint:disable-next-line max-line-length
const NORTH_AMERCIA_PHONE_REGEX = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/

const valueMatchesRegex = compose(test(NORTH_AMERCIA_PHONE_REGEX), prop('value'))

export const phoneNumberValidator = ifElse(valueMatchesRegex, always(null), always({phoneNumber: true}))
