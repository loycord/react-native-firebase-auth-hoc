import * as React from "react";
import * as firebase from "firebase";
import { Provider as LoadingProvider } from "react-native-loading-hoc";
import Context, { initialState, State } from "./context";

interface Props {
  children: React.ReactChild;
  onInit?: (uid: string) => Promise<{}>;
}

class Provider extends React.Component<Props, State> {
  signIn: () => void;
  signOut: () => void;
  constructor(props: any) {
    super(props);
    this.signIn = () => {
      const user = firebase.auth().currentUser;
      this.setState({ user, isLoggedIn: true });
    };
    this.signOut = () => {
      firebase.auth().signOut();
      this.setState({ isLoggedIn: false, user: null });
    };
    this.state = {
      ...initialState,
      signIn: this.signIn,
      signOut: this.signOut,
      signInAnonymously: this.signInAnonymously.bind(this),
      signInWithEmailAndPassword: this.signInWithEmailAndPassword.bind(this),
      signInWithFacebook: this.signInWithFacebook.bind(this),
      signInWithGoogle: this.signInWithGoogle.bind(this),
      createUserWithEmailAndPassword: this.createUserWithEmailAndPassword.bind(
        this
      )
    };

    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const result = await Promise.all([
      this.wait(1000),
      this.onAuthStateChanged()
    ]);
    let user = result[1];

    if (user) {
      if (this.props.onInit) {
        const customUser = await this.props.onInit(user.uid);
        user = { ...user, ...customUser };
      }
      this.setState({ user, initialize: true, isLoggedIn: true });
    } else {
      this.setState({ initialize: true });
    }
  }

  wait(ms: number) {
    return new Promise(r => setTimeout(() => r(), ms));
  }

  onAuthStateChanged(): Promise<firebase.User | null> {
    return new Promise(r => {
      firebase.auth().onAuthStateChanged((user: any) => r(user));
    });
  }

  handleSignError(err: Error) {
    console.warn(err);
  }

  async signInAnonymously() {
    try {
      await firebase.auth().signInAnonymously();
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async signInWithFacebook(promise: () => Promise<string>) {
    try {
      const token = await promise();
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async signInWithGoogle(promise: () => Promise<string>) {
    try {
      const token = await promise();
      const credential = firebase.auth.GoogleAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  public render() {
    return (
      <Context.Provider value={this.state}>
        <LoadingProvider>{this.props.children}</LoadingProvider>
      </Context.Provider>
    );
  }
}

export default Provider;
