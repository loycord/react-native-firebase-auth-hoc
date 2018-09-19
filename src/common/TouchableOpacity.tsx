import * as React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  children?: any;
  onPress?: Function;
  disabled?: boolean;
  [key: string]: any;
}
interface State {
  disabled: boolean;
}

export default class extends React.PureComponent<Props, State> {
  wait: any;
  constructor(props: any) {
    super(props);
    this.state = {
      disabled: false
    };

    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress(onPress: Function = () => {}, duration: number) {
    if (!this.state.disabled) {
      this.setState({ disabled: true });
      onPress && onPress();
      this.wait = setTimeout(() => {
        this.setState({ disabled: false });
      }, duration);
    }
  }

  render() {
    let { children, onPress, disabled, duration, ...props } = this.props;
    disabled = disabled || this.state.disabled;
    duration = duration || 500;

    return (
      <TouchableOpacity
        {...props}
        disabled={disabled}
        onPress={() => this.handleOnPress(onPress, duration)}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
