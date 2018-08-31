import * as firebase from 'firebase';
import * as React from 'react';

export interface State {
  user: firebase.User | null;
  initialize: boolean;
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  signInAnonymously: () => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithFacebook: (promise: () => Promise<string>) => Promise<any>;
  signInWithGoogle: (promise: () => Promise<string>) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
}

export const initialState: State = {
  user: null,
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
