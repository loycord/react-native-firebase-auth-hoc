# Auth HOC

## Usage

```jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import withAuth, { Provider as AuthProvider } from '{AuthHOC-path}';
import Home from './Home';

function FacebookButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{ padding: 10, margin: 10, backgroundColor: '#3B5998' }}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

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

const HomeHOC = withAuth(Home, {
  emailConfing: null, // Disable Email Login
  facebookConfig: {
    title: 'FACEBOOK LOGIN',
    getToken: getExpoFacebookToken,
    button: props => <FacebookButton {...props} />
  },
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
      <AuthProvider>
        <HomeHOC />
      </AuthProvider>
    );
  }
}

export default App;
```

## Reference

### Options

```javascript
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
    getToken: () => Promise<string>;
    renderButton?: Button;
  };
  googleConfig?: {
    title?: string;
    getToken: () => Promise<string>;
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
```

### Methods

**this.props.auth**

#### signIn()

Change to login status.

```javascript
signIn();
```

---

#### signOut()

Change to logout status.

```javascript
signOut();
```

---

#### signInAnonymously()

Anonymous sign in.

```javascript
signInAnonymously();
```

---

#### signInWithFacebook()

You can log in to Facebook via a promise function that returns a token.

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

You can log in to Google via a promise function that returns a token.

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
createUserWithEmailAndPassword(email, password);
```
