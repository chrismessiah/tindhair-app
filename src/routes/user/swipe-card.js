import React from 'react';
import { View, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import Slider from "react-native-slider";
import Swipeable from 'react-native-swipeable';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import { changeGender } from '../../actions';

const RIGHT_BUTTON_WIDTH = 100;

class SwipeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonOpacity: 0,
      cardOpacity: new Animated.Value(1),
    };
  }
  _xPanEventListener = (e) => {
    let value = (e.value/RIGHT_BUTTON_WIDTH)*(-1);
    let percent;
    if (value < 0) percent = 0;
    else if (value > 1) percent = 1;
    else percent = Math.pow(value, 2);
    this.setState({...this.state, buttonOpacity: percent})
  }
  _onButtonPress = () => {
    const duration = 1000;
    Animated.timing(this.state.cardOpacity, {toValue: 0, duration: duration, useNativeDriver: true}).start();
    this.setTimeout(() => {
      console.log('HANDLE CALLBACK HERE');
    }, duration);
  }
  render() {
    return(
      <Swipeable
        onPanAnimatedValueRef={(a) => a.x.addListener(this._xPanEventListener)}
        rightButtons={[<RightButton opacity={this.state.buttonOpacity} cardOpacity={this.state.cardOpacity} onPress={this._onButtonPress}/>]}
        rightButtonWidth={RIGHT_BUTTON_WIDTH}
        leftActionActivationDistance={50}
      >
        <Animated.View style={{opacity: this.state.cardOpacity}}>
          <Card {...this.props.hairstyle} style={{alignSelf: 'center'}}/>
        </Animated.View>
      </Swipeable>
    )
  }
}

class RightButton extends React.Component {
  render() {
    let opacity = (this.props.opacity === 1) ? this.props.cardOpacity : this.props.opacity;
    return(
      <Animated.View style={[{height: 325, justifyContent: 'center', opacity: opacity}]}>
        <TouchableWithoutFeedback onPress={this.props.onPress} style={{width: 40, height: 40}}>
          <Image style={{width: 40, height: 40}} source={require('../../assets/images/delete.png')}/>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
}
reactMixin(SwipeCard.prototype, TimerMixin);

export default SwipeCard;
