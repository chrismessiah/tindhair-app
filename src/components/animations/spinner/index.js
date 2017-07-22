import React from 'react';
import { View, Text, Animated, Image, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import styles from './styles';

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const cycleTime = (this.props.cycleTime) ? this.props.cycleTime : 1000;

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.spinValue, {toValue: 1, duration: cycleTime, useNativeDriver: true, easing: Easing.elastic(1)}),
        Animated.timing(this.state.spinValue, {toValue: 0, duration: 1, useNativeDriver: true}),
      ])
    ).start();
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={this.props.style}>
        <Animated.View style={{transform: [{rotate: spin}] }}>
          <Image source={this.props.source} style={this.props.style}/>
        </Animated.View>
      </View>
    )
  }
};
reactMixin(Spinner.prototype, TimerMixin);

export default Spinner;
