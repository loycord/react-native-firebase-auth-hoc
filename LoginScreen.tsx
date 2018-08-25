import * as React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
// types
import { State as ContextState } from './context';
import { Options } from './withAuth';
// components
import { Button, TextButton } from './common';

interface Props {
  navigation: any;
  screenProps:
    | {
        auth: ContextState;
        options?: Options;
      }
    | any;
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
    if (
      (props.screenProps.auth.initialize && !state.startAnim) ||
      (props.screenProps.auth.initialize &&
        !props.screenProps.isLoggedIn &&
        !state.startAnim)
    ) {
      return { startAnim: true };
    }
    return null;
  }

  animate() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  render() {
    if (this.state.startAnim) {
      this.animate();
    }

    const { style, renderLoginBackScreen } = this.props.screenProps.auth.options;
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
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  }

  renderLogo() {
    const { logoConfig } = this.props.screenProps.auth.options;
    let Logo = <Text style={styles.logoText}>{logoConfig.title}</Text>;
    if (logoConfig.renderLogo) {
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

    let buttons = [];
    if (emailConfig) {
      const props = {
        title: emailConfig.title || 'Email Login',
        onPress: () => this.push('EmailSignIn')
      };
      const button = emailConfig.button ? (
        emailConfig.button(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (facebookConfig && facebookConfig.getToken) {
      const props = {
        title: facebookConfig.title || 'Facebook Login',
        onPress: () => signInWithFacebook(facebookConfig.getToken)
      };
      const button = facebookConfig.button ? (
        facebookConfig.button(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (googleConfig && googleConfig.getToken) {
      const props = {
        title: googleConfig.title || 'Google Login',
        onPress: () => signInWithGoogle(googleConfig.getToken)
      };
      const button = googleConfig.button ? (
        googleConfig.button(props)
      ) : (
        <Button {...props} style={buttonStyle} />
      );
      buttons.push(button);
    }

    if (anonymousConfig) {
      const props = {
        title: anonymousConfig.title || 'Skip Login',
        onPress: () => signInAnonymously()
      };
      const button = anonymousConfig.button ? (
        anonymousConfig.button(props)
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
    justifyContent: 'space-evenly',
    backgroundColor: '#a1beb4'
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  logoText: {
    fontSize: 50,
    fontWeight: '800'
  }
});

export default LoginScreen;
