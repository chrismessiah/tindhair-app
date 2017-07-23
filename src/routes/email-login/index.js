import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import ColorButton from '../../components/buttons/color-button/';
import TextButton from '../../components/buttons/text-button/';
import TextInput from '../../components/inputs/text-input/';

import { loginUser } from '../../actions/'

import styles from './styles';
import globalStyles from '../../styles';

class EmailLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoginMode: true, email: '', password: '', username: ''};
  }
  _updateFields = (field) => {
    return (text) => {
      let newState = {...this.state};
      newState[field] = text;
      this.setState(newState);
    }
  }

  _updateEmail = this._updateFields('email');
  _updatePassword = this._updateFields('password');
  _updateUsername = this._updateFields('username');

  _setMode = (mode) => {
    this.setState({...this.state, isLoginMode: mode});
  }
  _showError = (text) => {
    MessageBarManager.showAlert({
      title: 'Error',
      message: text,
      alertType: 'error',
      viewTopInset : 15,
    });
  }
  _handleButtonPress = () => {
    if ((!this.state.isLoginMode) && (this.state.username === '')) {
      return this._showError("You haven't specified a username!")
    }
    if (this.state.email === '') {
      return this._showError("You haven't specified an email!")
    }
    if (this.state.password === '') {
      return this._showError("You haven't specified a password!")
    }

    this.props.dispatch(loginUser({email: this.state.email, password: this.state.password}))

    if (this.state.isLoginMode) {
      this.props.navigation.navigate('Loader')
    } else {
      this.props.navigation.navigate('GenderSelection')
    }
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background]} >
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
        <View style={styles.textButtonContainer}>
          <TextButton style={styles.textButton} value={"Sign in"} color={"white"} active={this.state.isLoginMode} onPress={() => {this._setMode(true)}}/>
          <TextButton style={styles.textButton} value={"Sign up"} color={"white"} active={!this.state.isLoginMode} onPress={() => {this._setMode(false)}}/>
        </View>
        <View style={[globalStyles.centerChildrenHorizontal, styles.inputContaier]}>
          {!this.state.isLoginMode && <TextInput callback={this._updateUsername} textColor={'#444444'} placeholder={'username'}/>}
          <TextInput callback={this._updateEmail} textColor={'#444444'} placeholder={'email'}/>
          <TextInput callback={this._updatePassword} textColor={'#444444'} placeholder={'password'} isPassword={true}/>
        </View>
        <View style={[globalStyles.centerChildrenHorizontal]}>
          <ColorButton style={styles.sumbitButton} onPress={this._handleButtonPress} color={'#265BFF'} value={this.state.isLoginMode ? 'Sign in' : 'Sign up'}/>
        </View>
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    appData: state.appData
  }
}

export default connect(mapStateToProps)(EmailLogin);
