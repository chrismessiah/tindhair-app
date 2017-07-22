import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';

import styles from './styles';

class ColorButton extends React.Component {
  _standardTouch() {
    Alert.alert('You tapped the button!');
  }
  render() {
    const buttonPressHandler = (this.props.onPress) ? this.props.onPress : this._standardTouch;
    const buttonStyle = (this.props.color) ? [styles.buttonContainer, {backgroundColor: this.props.color}] : styles.buttonContainer;
    return (
      <View style={[styles.view, this.props.style]}>
        <TouchableHighlight onPress={buttonPressHandler} style={styles.touchable}>
          <View style={buttonStyle}>
            <Text style={styles.buttonText}>{this.props.value}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
};

export default ColorButton;
