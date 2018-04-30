import {environment} from '../../../environments/environment'

const OFFSET = 20

const getElementScrollPosition = (ele: Element) => {
  return window.scrollY + (ele.getBoundingClientRect().top - environment.navbarHeight - OFFSET)
}

export const scrollToElement = (element: Element | null) => {
  if (element)
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: getElementScrollPosition(element)
    })
}
