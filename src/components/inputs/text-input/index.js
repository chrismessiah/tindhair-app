import React from 'react';
import { View, Text, TouchableHighlight, Alert, TextInput } from 'react-native';

import styles from './styles';

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.defaultText = this.props.placeholder ? this.props.placeholder : 'Write something';
    this.defaultNoClicks = false;
    this.state = {
      text: this.defaultText,
      noClicks: this.defaultNoClicks,
      password: false,
    };
  }
  _onClick = (text) => {
    if (!this.state.noClicks) {
      let newState = {...this.state, noClicks: true, text: ''};
      if (this.props.isPassword) {
        newState = {...newState, password: true};
      }
      this.setState(newState);
    }
  }
  _onType = (text) => {
    this.setState({...this.state, text: text});
    if (this.props.callback) {
      this.props.callback(text);
    }
  }
  _onEndEdit = () => {
    if (this.state.text.length === 0) {
      let newState = {...this.state, text: this.defaultText, noClicks: this.defaultNoClicks};
      if (this.props.isPassword) {
        newState = {...newState, password: false};
      }
      this.setState(newState);
    }
  }
  render() {
    const textStyle = (this.props.textColor) ? [styles.textInput, {color: this.props.textColor}] : styles.textInput;
    const boxStyle = (this.props.backgroundColor) ? [styles.textBox, {backgroundColor: this.props.backgroundColor}] : styles.textBox;
    const isPassword = (this.props.isPassword && this.state.password) ? this.props.isPassword : false;
    const useAutocorrect = (this.props.useAutocorrect) ? this.props.useAutocorrect : false;
    return (
      <View style={boxStyle}>
        <TextInput
          style={textStyle}
          onFocus={this._onClick}
          onChangeText={this._onType}
          value={this.state.text}
          onEndEditing={this._onEndEdit}
          secureTextEntry={isPassword}
          autoCorrect={useAutocorrect}
        />
      </View>
    )
  }
};

export default CustomTextInput;
