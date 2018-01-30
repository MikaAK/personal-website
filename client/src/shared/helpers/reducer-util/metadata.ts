export type StateActionTuple<S, T> = [S, PayloadAction<T>]
export type StateActionTupleFunction<S, T, R = Partial<S>> = ([state, action]: StateActionTuple<S, T>) => R
export type ActionCondMap<S, T> = [string, StateActionTupleFunction<S, T>][]
