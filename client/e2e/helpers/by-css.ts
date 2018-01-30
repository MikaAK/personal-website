import {by} from 'protractor'

export const byCss = (className: string) => () => by.css(className)
