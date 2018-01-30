export const getPropWhenExists = <T>(property: keyof T) => (item: T) => item[property] || item
