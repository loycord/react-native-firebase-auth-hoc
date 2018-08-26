import * as React from 'react';

export interface State {
  initialize: boolean;
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  signInAnonymously: () => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithFacebook: (callback: () => Promise<string>) => Promise<any>;
  signInWithGoogle: (callback: () => Promise<string>) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
}

export const initialState: State = {
  initialize: false,
  isLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
  signInAnonymously: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithFacebook: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve()
};

export default React.createContext(initialState);
