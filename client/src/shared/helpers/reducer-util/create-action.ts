export const createAction = <T>(type: string) => (payload: T) => ({type, payload})
export const createEmptyAction = (type: string) => () => ({type})
