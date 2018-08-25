import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  style?: {};
}

export default class extends React.PureComponent<Props> {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20a69a',
    margin: 8
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
});
