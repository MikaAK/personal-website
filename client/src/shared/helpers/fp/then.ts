export const then = <T>(fn: (item: T) => any) => (promise: Promise<T>) => promise.then(fn)
