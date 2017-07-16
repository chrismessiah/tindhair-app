import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './styles';

class Foo extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={styles.backgroundImage} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <TouchableWithoutFeedback>
          <View style={styles.fbLogin}><Text style={styles.buttonText}>Log in with Facebook</Text></View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.login}><Text style={styles.buttonText}>Use email instead</Text></View>
        </TouchableWithoutFeedback>
      </Image>
    );
  }
};

const App = StackNavigator({
  Home: { screen: Foo },
});

export default App;
