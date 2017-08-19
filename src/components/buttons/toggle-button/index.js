import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import Triangle from 'react-native-triangle';

import styles from './styles';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeButton: this.props.activeButton || 1,
    }
  }

  _onPress(num) {
    if (this.state.activeButton != num) {
      this.setState({...this.state, activeButton: num});
      if (this.props.onPress) {
        this.props.onPress(num);
      } else {
        Alert.alert(`You tapped the button ${num}!`);
      }
    }
  }

  render() {
    const {color1, color2} = this.props;
    const {activeButton} = this.state

    let buttonOuterStyle1, buttonOuterStyle2, textStyle1, textStyle2;
    if (this.state.activeButton === 1) {
      buttonOuterStyle1 = [styles.buttonContainer, {backgroundColor: color1, width: styles.buttonContainer.width+1}];
      buttonOuterStyle2 = [styles.buttonContainer, {backgroundColor: color2, width: styles.buttonContainer.width+1}];
      textStyle1 = [styles.buttonText, styles.buttonActive, {color: color2}];
      textStyle2 = [styles.buttonText, styles.buttonInactive, {color: color1}];
    } else {
      buttonOuterStyle1 = [styles.buttonContainer, {backgroundColor: color2, width: styles.buttonContainer.width+1}];
      buttonOuterStyle2 = [styles.buttonContainer, {backgroundColor: color1, width: styles.buttonContainer.width+1}];
      textStyle1 = [styles.buttonText, styles.buttonInactive, {color: color1}];
      textStyle2 = [styles.buttonText, styles.buttonActive, {color: color2}];
    }

    return (
      <View style={[styles.view, this.props.style, {borderColor: color1}]}>
        <View style={[buttonOuterStyle1, styles.buttonLeftContainer]}>
          <TouchableWithoutFeedback onPress={() => {this._onPress(1)}}>
            <View style={styles.buttonContainer}>
              <Text style={textStyle1}>{this.props.value1}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={[buttonOuterStyle2, styles.buttonRightContainer]}>
          <TouchableWithoutFeedback onPress={() => {this._onPress(2)}}>
            <View style={styles.buttonContainer}>
              <Text style={textStyle2}>{this.props.value2}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
};

export default ToggleButton;
