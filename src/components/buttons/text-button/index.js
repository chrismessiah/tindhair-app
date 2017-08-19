import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';

import styles from './styles';

class TextButton extends React.Component {
  _standardTouch() {
    Alert.alert('You tapped the button!');
  }
  render() {
    const buttonPressHandler = (this.props.onPress) ? this.props.onPress : this._standardTouch;

    let buttonTextStyle = [styles.buttonText];
    let buttonContainerStyle = [styles.buttonContainer]
    if (this.props.color) {
      buttonTextStyle.push({color: this.props.color});
    }
    if (this.props.active) {
      buttonTextStyle.push(styles.buttonTextActive);
      buttonContainerStyle.push(styles.buttonContainerActive);
      if (this.props.activeBgColor) buttonContainerStyle.push({backgroundColor: this.props.activeBgColor});
    }

    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback onPress={buttonPressHandler} style={styles.touchable}>
          <View style={buttonContainerStyle}>
            <Text style={buttonTextStyle}>{this.props.value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

export default TextButton;
