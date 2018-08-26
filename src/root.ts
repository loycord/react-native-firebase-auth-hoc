import { createStackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import EmailSignIn from './EmailSignIn';
import EmailSignUp from './EmailSignUp';

export default createStackNavigator(
  {
    LoginScreen,
    EmailSignIn,
    EmailSignUp
  },
  {
    headerMode: 'none'
  }
);
