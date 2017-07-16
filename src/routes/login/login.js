import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GradientButton from '../../components/buttons/gradient-button/';
import styles from './styles';

class Foo extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={styles.backgroundImage} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <GradientButton style={styles.fbButton} colors={['#1B4DFF', '#5CA1FF']} value={"Log in with Facebook"}/>
        <GradientButton style={styles.emailButton} colors={['#A09E9E', '#BDBDBD']} value={"Use email instead"}/>
        <GradientButton onPress={function() {Alert.alert('You passed a custom function!')}} style={styles.emailButton} colors={['#FF5E00', '#FBB869']} value={"Orange button"}/>
      </Image>
    );
  }
};

const App = StackNavigator({
  Home: { screen: Foo },
});

export default App;
