import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux'
//var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import ColorButton from '../../components/buttons/color-button/';
import TextButton from '../../components/buttons/text-button/';
import TextInput from '../../components/inputs/text-input/';

import { loginUser, storeSignupDetails, showMessage } from '../../actions/'

import styles from './styles';
import globalStyles from '../../styles';

class EmailLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoginMode: true, email: '', password: '', fullname: ''};
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
  _updateFullname = this._updateFields('fullname');

  _setMode = (mode) => {
    this.setState({...this.state, isLoginMode: mode});
  }
  _showError = (text) => {
    this.props.dispatch(showMessage({
      title: 'Error',
      message: text,
      type: 'error',
    }));
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.global.highlight === 'string' && nextProps.global.highlight === 'L') {
      this.setState({...this.state, isLoginMode: true})
    }
  }
  _isValidInput = () => {
    if ((!this.state.isLoginMode) && (this.state.fullname === '')) {
      this._showError("You haven't specified a fullname!")
      return false;
    }
    if (this.state.email === '' || this.state.email.indexOf('@') === -1) {
      this._showError("You haven't specified an email!")
      return false;
    }
    if (this.state.password === '') {
      this._showError("You haven't specified a password!")
      return false;
    }
    return true;
  }
  _handleLogin = () => {
    if (this._isValidInput()) {
      this.props.dispatch(loginUser({email: this.state.email, password: this.state.password}))
      this.props.navigation.navigate('Loader')
    }
  }
  _handleSignup = () => {
    if (this._isValidInput()) {
      this.props.dispatch(storeSignupDetails({email: this.state.email, password: this.state.password, fullname: this.state.fullname}))
      this.props.navigation.navigate('GenderSelection');
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
          {!this.state.isLoginMode && <TextInput callback={this._updateFullname} textColor={'#444444'} placeholder={'fullname'}/>}
          <TextInput callback={this._updateEmail} textColor={'#444444'} placeholder={'email'}/>
          <TextInput callback={this._updatePassword} textColor={'#444444'} placeholder={'password'} isPassword={true}/>
        </View>
        <View style={[globalStyles.centerChildrenHorizontal, styles.buttonContainer]}>
          <ColorButton style={styles.sumbitButton} onPress={(this.state.isLoginMode) ? this._handleLogin : this._handleSignup} color={'#5f74e4'} value={this.state.isLoginMode ? 'Sign in' : 'Sign up'}/>
        </View>
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(EmailLogin);
