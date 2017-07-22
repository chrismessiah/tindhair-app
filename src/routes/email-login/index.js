import React from 'react';
import { View, Image } from 'react-native';

import ColorButton from '../../components/buttons/color-button/';
import TextButton from '../../components/buttons/text-button/';
import TextInput from '../../components/inputs/text-input/';

import styles from './styles';
import globalStyles from '../../styles';

class EmailLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSignInMode: true};
  }
  _setMode = (mode) => {
    this.setState({...this.state, isSignInMode: mode});
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background]} >
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
        <View style={styles.textButtonContainer}>
          <TextButton style={styles.textButton} value={"Sign in"} color={"white"} active={this.state.isSignInMode} onPress={() => {this._setMode(true)}}/>
          <TextButton style={styles.textButton} value={"Sign up"} color={"white"} active={!this.state.isSignInMode} onPress={() => {this._setMode(false)}}/>
        </View>
        <View style={[globalStyles.centerChildrenHorizontal, styles.inputContaier]}>
          <TextInput textColor={'#444444'} placeholder={'email'}/>
          <TextInput textColor={'#444444'} placeholder={'password'} isPassword={true}/>
          <ColorButton style={styles.sumbitButton} onPress={() => {this.props.navigation.navigate(!this.state.isSignInMode ? 'GenderSelection' : 'Loader')}} color={'#265BFF'} value={this.state.isSignInMode ? 'Sign in' : 'Sign up'}/>
        </View>
      </View>
    );
  }
};

export default EmailLogin;
