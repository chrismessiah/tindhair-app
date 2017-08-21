import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';

import styles from './styles';

class ColorButton extends React.Component {
  _standardTouch() {
    Alert.alert('You tapped the button!');
  }
  render() {
    const buttonPressHandler = (this.props.onPress) ? this.props.onPress : this._standardTouch;
    return (
      <View style={[styles.view, this.props.style]}>
        <TouchableWithoutFeedback onPress={buttonPressHandler}>
          <Image source={this.props.source} style={this.props.imageStyle} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

export default ColorButton;
