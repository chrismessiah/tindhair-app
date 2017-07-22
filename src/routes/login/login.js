import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GradientButton from '../../components/buttons/gradient-button/';
import ColorButton from '../../components/buttons/color-button/';
import TextButton from '../../components/buttons/text-button/';
import TextInput from '../../components/inputs/text-input/';
import styles from './styles';

class Root extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={styles.background} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <GradientButton style={styles.fbButton} colors={['#1B4DFF', '#5CA1FF']} value={"Log in with Facebook"}/>
        <GradientButton style={styles.emailButton} colors={['#A09E9E', '#BDBDBD']} value={"Use email instead"}/>
        <GradientButton onPress={() => {this.props.navigation.navigate('Next')}} style={styles.emailButton} colors={['#FF5E00', '#FBB869']} value={"Orange button"}/>
      </Image>
    );
  }
};

class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSignInMode: true};
  }
  _setMode = (mode) => {
    this.setState({...this.state, isSignInMode: mode});
  }
  render() {
    return (
      <View style={styles.background2} >
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
        <View style={styles.textButtonContainer2}>
          <TextButton style={styles.textButton2} value={"Sign in"} color={"white"} active={this.state.isSignInMode} onPress={() => {this._setMode(true)}}/>
          <TextButton style={styles.textButton2} value={"Sign up"} color={"white"} active={!this.state.isSignInMode} onPress={() => {this._setMode(false)}}/>
        </View>
        <View style={styles.inputContaier2}>
          <TextInput textColor={'#444444'} placeholder={'email'}/>
          <TextInput textColor={'#444444'} placeholder={'password'} isPassword={true}/>
          <ColorButton style={styles.sumbitButton2} onPress={() => {this.props.navigation.navigate(!this.state.isSignInMode ? 'NextNext' : 'Loader')}} color={'#265BFF'} value={this.state.isSignInMode ? 'Sign in' : 'Sign up'}/>
        </View>
      </View>
    );
  }
};


class NextNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }
  _onClick = (param) => {
    this.props.navigation.navigate('Loader')
  }
  render() {
    return (
      <View style={styles.background2}>
        <View style={styles.inputContaier2}>
          <Text style={styles.h1White}>Puh.. almost done!</Text>
          <Text style={[styles.h2White, styles.marginSmall]}>Show me hairstyles for</Text>
          <ColorButton style={[styles.sumbitButton3, styles.marginSmaller]} onPress={() => {this._onClick()}} color={'#265BFF'} value={'Men'}/>
          <ColorButton style={styles.marginSmaller} onPress={() => {this._onClick()}} color={'#265BFF'} value={'Women'}/>
          <ColorButton style={styles.marginSmaller} onPress={() => {this._onClick()}} color={'#265BFF'} value={'Both'}/>
        </View>
      </View>
    )
  }
};

class Loader extends React.Component {
  render() {
    return (
      <View style={styles.background2}>

      </View>
    )
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
    },
    NextNext: {
      screen: NextNext,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    Loader: {
      screen: Loader,
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
