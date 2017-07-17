import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GradientButton from '../../components/buttons/gradient-button/';
import TextButton from '../../components/buttons/text-button/';
import styles from './styles';

class Root extends React.Component {
  _nav(route) {
    this.props.navigation.navigate(route)
  }
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={styles.background} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <GradientButton style={styles.fbButton} colors={['#1B4DFF', '#5CA1FF']} value={"Log in with Facebook"}/>
        <GradientButton style={styles.emailButton} colors={['#A09E9E', '#BDBDBD']} value={"Use email instead"}/>
        <GradientButton onPress={() => {this._nav('Next')}} style={styles.emailButton} colors={['#FF5E00', '#FBB869']} value={"Orange button"}/>
      </Image>
    );
  }
};

class Next extends React.Component {
  _nav(route) {
    this.props.navigation.navigate(route)
  }
  render() {
    return (
      <View style={styles.background2} >
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
        <TextButton value={"Sign in"} color={"white"} active={true}/>
        <TextButton value={"Sign up"} color={"white"} active={false}/>
        <GradientButton onPress={() => {this._nav('')}} style={styles.emailButton} colors={['#FF5E00', '#FBB869']} value={"Orange button"}/>
      </View>
    );
  }
};

const App = StackNavigator(
  {
    Root: {
      screen: Root,
      navigationOptions: {header: false},
    },
    Next: {
      screen: Next,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    }
  },
  {
    initialRouteName: 'Root',
  }
);

export default App;
