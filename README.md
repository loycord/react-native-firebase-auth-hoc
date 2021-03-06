# Auth HOC

## Usage

```jsx
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import withAuth, { Provider as AuthProvider } from 'react-native-firebase-auth-hoc';

function Home({ auth }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>{JSON.stringify(auth.user)}</Text>
    </View>
  );
}

const HomeWithHOC = withAuth(Home, {
  style: {
    backgroundColor: '#fdfdfd'
  },
  buttonStyle: {
    backgroundColor: 'lightblue'
  }
});

class App extends React.Component {
  render() {
    return (
      <AuthProvider
        onInit={uid =>
          new Promise(r => {
            setTimeout(() => {
              r({ age: 30, gender: 'male' });
            }, 500);
          })
        }
      >
        <HomeWithHOC />
      </AuthProvider>
    );
  }
}

export default App;
```

# Provider

## Reference

### Props

| property          | description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| [onInit](#oninit) | Functions executed at initialization and updating of custom user information. |

#### onInit

| NAME    | TYPE    | REQUIRED | DESCRIPTION                                |
| ------- | ------- | -------- | ------------------------------------------ |
| promise | Promise | Yes      | Promise to return user information to add. |

# withAuth

## Reference

### Options

```javascript
withAuth((Component: React.ComponentClass<any>), (options: Options = initialOptions));
```

```javascript
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
```

### Property

| property | description   |
| -------- | ------------- |
| user     | firebase.user |

### Methods

| methods                                                           | description                                                             |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [signIn](#signin)                                                 | Change to login status.                                                 |
| [signOut](#signout)                                               | Change to logout status.                                                |
| [signInAnonymously](#signinanonymously)                           | Asynchronously signs in as an anonymous user.                           |
| [signInWithFacebook](#signinwithfacebook)                         | You can log in to Facebook via a promise function that returns a token. |
| [signInWithGoogle](#signinwithgoogle)                             | You can log in to Google via a promise function that returns a token.   |
| [createUserWithEmailAndPassword](#createuserwithemailandpassword) | Asynchronously signs in using an email and password.                    |

#### signIn()

```javascript
signIn();
```

---

#### signOut()

```javascript
signOut();
```

---

#### signInAnonymously()

```javascript
signInAnonymously();
```

---

#### signInWithFacebook()

```javascript
signInWithFacebook: (promise: () => Promise<string>) => Promise<any>;
```

| NAME    | TYPE    | REQUIRED | DESCRIPTION                        |
| ------- | ------- | -------- | ---------------------------------- |
| promise | Promise | Yes      | Promise to return a Facebook token |

```javascript
async function getExpoFacebookToken() {
  const response = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profile', 'email'],
    behavior: 'web'
  });

  if (response.type === 'success') {
    return response.token;
  } else {
    throw new Error('Expo Error');
  }
}

signInWithFacebook(getExpoFacebookToken);
```

---

#### signInWithGoogle()

```javascript
signInWithGoogle: (promise: () => Promise<string>) => Promise<any>;
```

| NAME    | TYPE    | REQUIRED | DESCRIPTION                      |
| ------- | ------- | -------- | -------------------------------- |
| promise | Promise | Yes      | Promise to return a Google token |

```javascript
async function getExpoGoogleToken() {
  const response = await Expo.Google.logInAsync({
    androidClientId: YOUR_CLIENT_ID_HERE,
    iosClientId: YOUR_CLIENT_ID_HERE,
    scopes: ['profile', 'email']
  });

  if (response.type === 'success') {
    return response.accessToken;
  } else {
    throw new Error('Expo Error');
  }
}

signInWithGoogle(getExpoGoogleToken);
```

---

#### createUserWithEmailAndPassword()

```javascript
createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
```

| NAME     | TYPE   | REQUIRED | DESCRIPTION |
| -------- | ------ | -------- | ----------- |
| email    | string | Yes      | email       |
| password | string | Yes      | password    |

## Support

### [react-navigation](https://reactnavigation.org/)

```javascript
withAuth(createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

// Home, Settings -> screenProps.auth
```
