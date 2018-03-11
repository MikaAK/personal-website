import {environment}  from '../../../environments/environment'

const getElementScrollPosition = (ele: Element) => {
  return window.scrollY + (ele.getBoundingClientRect().top - environment.navbarHeight - 20)
}


export const scrollToElement = (element: Element | null) => {
  if (element)
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: getElementScrollPosition(element)
    })
}

