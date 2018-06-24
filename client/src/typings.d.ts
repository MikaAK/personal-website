/* SystemJS module definition */
declare var module: NodeModule

interface PayloadAction<T = any> {
  type: string
  payload: T
}

interface NodeModule {
  id: string
  hot: boolean
}

declare module '*.json';
declare module '*.graphql';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module 'idle-promise';
declare module 'smoothscroll-polyfill';
declare module 'lodash.words';
declare module 'creditcards*';
