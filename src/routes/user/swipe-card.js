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
      cardHeight: new Animated.Value(325),
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
    Animated.sequence([
      Animated.timing(this.state.cardOpacity, {toValue: 0, duration: duration}),
      Animated.timing(this.state.cardHeight, {toValue: 0, duration: duration}),
    ]).start()
    if (this.props.callbackRemove) {
      this.setTimeout(() => this.props.callbackRemove(this.props.hairstyle.id), duration*2);
    }
  }
  render() {
    return(
      <Swipeable
        onPanAnimatedValueRef={(a) => a.x.addListener(this._xPanEventListener)}
        rightButtons={[<RightButton opacity={this.state.buttonOpacity} cardHeight={this.state.cardHeight} cardOpacity={this.state.cardOpacity} onPress={this._onButtonPress}/>]}
        rightButtonWidth={RIGHT_BUTTON_WIDTH}
        leftActionActivationDistance={50}
      >
        <Animated.View style={{opacity: this.state.cardOpacity, height: this.state.cardHeight}}>
          <Card {...this.props.hairstyle} style={{alignSelf: 'center'}}/>
        </Animated.View>
      </Swipeable>
    )
  }
}

class RightButton extends React.Component {
  render() {
    let opacity = (this.props.opacity === 1) ? this.props.cardOpacity : this.props.opacity;
    const imageStyle = {width: 40, height: 40};
    return(
      <Animated.View style={[{justifyContent: 'center', height: this.props.cardHeight, opacity: opacity}]}>
        <TouchableWithoutFeedback style={imageStyle} onPress={this.props.onPress}>
          <Image style={imageStyle} source={require('../../assets/images/delete.png')}/>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
}
reactMixin(SwipeCard.prototype, TimerMixin);

export default SwipeCard;
