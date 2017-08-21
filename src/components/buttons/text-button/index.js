import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';

import styles from './styles';

class TextButton extends React.Component {
  _standardTouch() {
    Alert.alert('You tapped the button!');
  }
  render() {
    let textStyle, containerStyle;
    if (this.props.active) {
      textStyle =  this.props.activeTextStyle || this.props.textStyle;
      containerStyle =  this.props.activeContainerStyle || this.props.containerStyle;
    } else {
      textStyle = this.props.textStyle;
      containerStyle = this.props.containerStyle;
    }

    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback onPress={this.props.onPress || this._standardTouch} >
          <View style={[styles.buttonContainer, containerStyle]}>
            <Text style={[styles.buttonText, textStyle]}>{this.props.value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

export default TextButton;
