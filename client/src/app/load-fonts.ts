import * as WebFont from 'webfontloader'

export function loadFonts() {
  return () => WebFont.load({
    google: {
      families: ['Roboto', 'Roboto:m', 'Roboto+Slab:b']
    }
  })
}
