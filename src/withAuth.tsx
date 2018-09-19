import * as React from "react";
import Context from "./context";
import FirebaseLogin from "./root";
import Initializer from "./Initializer";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

type Button = ({ title, onPress }: ButtonProps) => Element;

export interface Options {
  emailConfig?: {
    title?: string;
    style?: {};
    textStyle?: {};
    renderButton?: Button;
  } | null;
  anonymousConfig?: {
    title?: string;
    style?: {};
    textStyle?: {};
    renderButton?: Button;
  } | null;
  facebookConfig?: {
    title?: string;
    style?: {};
    textStyle?: {};
    getToken: () => Promise<any>;
    renderButton?: Button;
  };
  googleConfig?: {
    title?: string;
    style?: {};
    textStyle?: {};
    getToken: () => Promise<any>;
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
}

const initialOptions: Options = {
  emailConfig: {
    title: "Email Sign In"
  },
  anonymousConfig: {
    title: "Skip Login"
  },
  logoConfig: {
    title: "LOGO"
  }
};

function withAuth(
  Component: React.ComponentClass<any>,
  options: Options = initialOptions
) {
  options = { ...initialOptions, ...options };
  return class extends React.Component<{ screenProps?: any }> {
    public render() {
      let screenProps = {};
      if (this.props.screenProps) {
        screenProps = this.props.screenProps;
      }
      return (
        <Context.Consumer>
          {auth => (
            <React.Fragment>
              {auth.isLoggedIn ? (
                <Component
                  {...this.props}
                  auth={auth}
                  screenProps={{ ...screenProps, auth }}
                />
              ) : (
                <FirebaseLogin
                  screenProps={{ ...this.props, auth: { ...auth, options } }}
                />
              )}
              <Initializer
                {...options.initializerConfig}
                initialize={auth.initialize}
              />
            </React.Fragment>
          )}
        </Context.Consumer>
      );
    }
  };
}

export default withAuth;
