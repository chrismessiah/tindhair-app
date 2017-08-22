import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import Triangle from 'react-native-triangle';

import styles from './styles';

class ToggleButton extends React.Component {
  _onPress(num) {
    if (this.props.activeButton != num) {
      if (this.props.onPress) {
        this.props.onPress(num);
      } else {
        Alert.alert(`You tapped the button ${num}!`);
      }
    }
  }

  render() {
    const firstButtonActive = this.props.activeButton === 1;

    return (
      <View style={[styles.view, this.props.style]}>
        <View style={[styles.buttonLeftContainer, (firstButtonActive ? styles.buttonActiveContainer : styles.buttonInactiveContainer)]}>
          <TouchableWithoutFeedback onPress={() => {this._onPress(1)}}>
            <View style={styles.buttonContainer}>
              {(firstButtonActive) ?
                <Image style={{height: 20, width: 20}} source={require('../../../assets/images/scissors-white.png')}/>
              :
                <Image style={{height: 20, width: 20}} source={require('../../../assets/images/scissors-orange-light.png')}/>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={[styles.buttonRightContainer, (!firstButtonActive ? styles.buttonActiveContainer : styles.buttonInactiveContainer)]}>
          <TouchableWithoutFeedback onPress={() => {this._onPress(2)}}>
            <View style={styles.buttonContainer}>
              {(!firstButtonActive) ?
                <Image style={{height: 20, width: 20}} source={require('../../../assets/images/Cogwheel-white.png')}/>
              :
                <Image style={{height: 20, width: 20}} source={require('../../../assets/images/Cogwheel-orange-light.png')}/>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
};

export default ToggleButton;
