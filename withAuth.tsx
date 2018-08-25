import * as React from 'react';
import Context from './context';
import FirebaseLogin from './root';
import Initializer from './Initializer';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

type Button = ({ title, onPress }: ButtonProps) => Element;

export interface Options {
  emailConfig?: {
    title?: string;
    renderButton?: Button;
  } | null;
  anonymousConfig?: {
    title?: string;
    renderButton?: Button;
  } | null;
  facebookConfig?: {
    title?: string;
    getToken: () => Promise<string | undefined>;
    renderButton?: Button;
  };
  googleConfig?: {
    title?: string;
    getToken: () => Promise<string | undefined>;
    renderButton?: Button;
  };
  logoConfig?: {
    title?: string;
    style?: {};
    renderLogo?: () => Element;
  };
  initializerConfig?: {
    text?: string;
    style?: {};
    duration?: number;
    renderInitializer?: () => Element;
  };
  renderLoginBackScreen?: () => Element;
  style?: {};
  buttonStyle?: {};
}

const initialOptions = {
  emailConfig: {
    title: 'Email Sign In'
  },
  anonymousConfig: {
    title: 'Skip Login'
  },
  logoConfig: {
    title: 'LOGO'
  }
};

function withAuth(
  Component: React.ComponentClass<any>,
  options: Options = initialOptions
) {
  return class extends React.Component {
    public render() {
      options = { ...initialOptions, ...options };
      return (
        <Context.Consumer>
          {auth => (
            <React.Fragment>
              {auth.isLoggedIn ? (
                <Component {...this.props} auth={auth} />
              ) : (
                <FirebaseLogin
                  screenProps={{ ...this.props, auth: { ...auth, options } }}
                />
              )}
              <Initializer {...options.initializerConfig} initialize={auth.initialize} />
            </React.Fragment>
          )}
        </Context.Consumer>
      );
    }
  };
}

export default withAuth;
