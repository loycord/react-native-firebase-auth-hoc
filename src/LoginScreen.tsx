import * as React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import withLoading, { State as LoadingState } from "react-native-loading-hoc";
// types
import { State as ContextState } from "./context";
import { Options } from "./withAuth";
// components
import { Button, TextButton } from "./common";

interface AuthProps extends ContextState {
  options: Options;
}

interface Props {
  navigation: any;
  screenProps: {
    auth: AuthProps;
  };
  loading: LoadingState;
}

interface State {
  startAnim: boolean;
  anim: Animated.Value;
}

class LoginScreen extends React.PureComponent<Props, State> {
  push: (name: string) => void;
  constructor(props: any) {
    super(props);
    this.state = {
      startAnim: false,
      anim: new Animated.Value(0)
    };
    this.push = (name: string) => this.props.navigation.navigate(name);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { initialize, isLoggedIn } = props.screenProps.auth;
    if (
      (initialize && !state.startAnim) ||
      (initialize && !isLoggedIn && !state.startAnim)
    ) {
      return { startAnim: true };
    }
    return null;
  }

  animate() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  render() {
    console.log(this.props);
    if (this.state.startAnim) {
      this.animate();
    }

    const {
      style,
      renderLoginBackScreen
    } = this.props.screenProps.auth.options;
    return (
      <View style={[styles.container, style]}>
        {renderLoginBackScreen && (
          <View style={styles.absolute}>{renderLoginBackScreen()}</View>
        )}
        <View style={styles.box}>{this.renderLogo()}</View>
        <View style={styles.box}>{this.renderButtons()}</View>
      </View>
    );
  }

  fadeIn(delay: number, from: number = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: "clamp"
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: "clamp"
          })
        }
      ]
    };
  }

  renderLogo() {
    const { logoConfig } = this.props.screenProps.auth.options;
    let title = logoConfig ? logoConfig.title : "Logo";
    let Logo: Element = <Text style={styles.logoText}>{title}</Text>;
    if (logoConfig && logoConfig.renderLogo) {
      Logo = logoConfig.renderLogo();
    }
    return <Animated.View style={this.fadeIn(100, 5)}>{Logo}</Animated.View>;
  }

  renderButtons() {
    const {
      emailConfig,
      facebookConfig,
      googleConfig,
      anonymousConfig,
      buttonStyle
    } = this.props.screenProps.auth.options;
    const {
      signInWithFacebook,
      signInWithGoogle,
      signInAnonymously
    } = this.props.screenProps.auth;

    const { loading } = this.props;

    let buttons = [];
    if (emailConfig) {
      const props = {
        title: emailConfig.title || "Email Login",
        onPress: () => this.push("EmailSignIn")
      };
      const button = emailConfig.renderButton ? (
        emailConfig.renderButton(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (facebookConfig && facebookConfig.getToken) {
      const props = {
        title: facebookConfig.title || "Facebook Login",
        onPress: () =>
          loading.apply(() => signInWithFacebook(facebookConfig.getToken))
      };
      const button = facebookConfig.renderButton ? (
        facebookConfig.renderButton(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (googleConfig && googleConfig.getToken) {
      const props = {
        title: googleConfig.title || "Google Login",
        onPress: () =>
          loading.apply(() => signInWithGoogle(googleConfig.getToken))
      };
      const button = googleConfig.renderButton ? (
        googleConfig.renderButton(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (anonymousConfig) {
      const props = {
        title: anonymousConfig.title || "Skip Login",
        onPress: () => loading.apply(signInAnonymously)
      };
      const button = anonymousConfig.renderButton ? (
        anonymousConfig.renderButton(props)
      ) : (
        <TextButton {...props} />
      );
      buttons.push(button);
    }

    const applyFadeInButtons = buttons.map((button, i) => (
      <Animated.View key={i} style={this.fadeIn(300 * (i + 1), 10 * (i + 1))}>
        {button}
      </Animated.View>
    ));

    return applyFadeInButtons;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#a1beb4"
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  logoText: {
    fontSize: 50,
    fontWeight: "800"
  }
});

export default withLoading(LoginScreen);
