import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { State as ContextState } from './context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1beb4'
  },
  input: {
    width: '80%',
    marginVertical: 5,
    borderWidth: 1,
    fontSize: 16,
    padding: 15
  },
  back: {
    marginLeft: 30,
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  backText: {
    fontSize: 30
  },
  heading: {
    fontSize: 35,
    fontWeight: '800',
    margin: 15
  }
});

interface Props {
  navigation: any;
  screenProps: ContextState;
}

interface State {
  [key: string]: string;
  email: string;
  password: string;
}

class EmailSignUp extends React.PureComponent<Props, State> {
  goBack: () => void;
  createUserWithEmailAndPassword: () => void;
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkPassword: ''
    };

    this.goBack = () => this.props.navigation.goBack();

    this.onChangeText = this.onChangeText.bind(this);
    this.createUserWithEmailAndPassword = () => {
      const { email, password } = this.state;
      const { createUserWithEmailAndPassword } = this.props.screenProps;
      if (createUserWithEmailAndPassword) {
        createUserWithEmailAndPassword(email, password);
      }
    };
  }

  onChangeText(name: 'email' | 'password' | 'checkPassword', text: string) {
    this.setState({ [name]: text });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableOpacity style={styles.back} onPress={this.goBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.heading}>Sign Up</Text>
        </View>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text: string) => this.onChangeText('email', text)}
          placeholder="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text: string) => this.onChangeText('password', text)}
          placeholder="password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={this.state.checkPassword}
          onChangeText={(text: string) => this.onChangeText('checkPassword', text)}
          placeholder="one more password"
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Sign Up" onPress={() => this.createUserWithEmailAndPassword()} />
      </KeyboardAvoidingView>
    );
  }
}

export default EmailSignUp;
