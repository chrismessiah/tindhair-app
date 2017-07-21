import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';

import styles from './styles';

class TextButton extends React.Component {
  _standardTouch() {
    Alert.alert('You tapped the button!');
  }
  render() {
    const buttonPressHandler = (this.props.onPress) ? this.props.onPress : this._standardTouch;

    var buttonTextStyle = [styles.buttonText];
    if (this.props.color) {
      buttonTextStyle.push({color: this.props.color});
    }
    if (this.props.active) {
      buttonTextStyle.push({fontWeight: 'bold'});
    }

    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback onPress={buttonPressHandler} style={styles.touchable}>
          <View><Text style={buttonTextStyle}>{this.props.value}</Text></View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

export default TextButton;
