import * as React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface Props {
  initialize: boolean;
  duration?: number;
  style?: {};
  children?: React.ReactChild;
  text?: string;
  renderInitializer?: () => Element;
}

interface State {
  hide: boolean;
  fadeAnim: Animated.Value;
}

export default class Initializer extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      hide: this.props.initialize
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.initialize && this.props.initialize) {
      this.animate();
    }
  }

  animate() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: this.props.duration || 1000
    }).start(() => {
      this.setState({ hide: true });
    });
  }

  render() {
    if (this.state.hide) return null;
    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: this.state.fadeAnim }
        ]}
      >
        {(this.props.renderInitializer && this.props.renderInitializer()) || (
          <View style={[styles.default, this.props.style]}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  default: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7F8489"
  },
  text: {
    fontSize: 18,
    color: "#043b40"
  }
});
