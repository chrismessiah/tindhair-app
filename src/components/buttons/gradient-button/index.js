import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

class GradientButton extends React.Component {
  render() {
    const buttonPressHandler = (this.props.onPress) ? this.props.onPress : function() {Alert.alert('You tapped the button!')};
    return (
      <View style={this.props.style}>
        <TouchableHighlight onPress={buttonPressHandler} style={styles.touchable}>
          <LinearGradient colors={this.props.colors} start={{x:0, y:0.5}} end={{x:1, y:0.5}} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.props.value}</Text>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    )
  }
};

export default GradientButton;
