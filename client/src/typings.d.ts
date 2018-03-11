/* SystemJS module definition */
declare var module: NodeModule

interface PayloadAction<T = any> {
  type: string
  payload: T
}

interface NodeModule {
  id: string
}

declare module '*.json';
declare module '*.graphql';
declare module 'lodash.words';
declare module 'idle-promise';
declare module 'smoothscroll-polyfill';
