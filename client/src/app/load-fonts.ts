import * as WebFont from 'webfontloader'

export function loadFonts() {
  return () => WebFont.load({
    google: {
      families: ['Lato', 'Lato:b', 'Lato:l']
    }
  })
}
