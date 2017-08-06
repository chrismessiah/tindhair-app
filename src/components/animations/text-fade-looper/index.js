import React from 'react';
import { View, Text, Animated } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import styles from './styles';

class TextFader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      text: this.props.loopValues[0],
      currentIndex: 0,
    };
  }

  _nextText = () => {
    let {currentIndex} = this.state;
    currentIndex = (currentIndex === this.props.loopValues.length-1) ? 0 : currentIndex+1;
    this.setState({...this.state, text: this.props.loopValues[currentIndex], currentIndex: currentIndex})
  }
  componentDidMount() {
    const cycleTime = (this.props.cycleTime) ? this.props.cycleTime : 3000;
    Animated.loop(
      Animated.sequence([
        Animated.timing( this.state.fadeAnim, {toValue: 1, duration: cycleTime/2, useNativeDriver: true}),
        Animated.timing( this.state.fadeAnim, {toValue: 0, duration: cycleTime/2, useNativeDriver: true}),
      ])
    ).start();
    this.setInterval(() => {this._nextText();}, cycleTime);
  }

  render() {
    return (
      <View style={this.props.style}>
        <Animated.View style={{opacity: this.state.fadeAnim}}>
          <Text style={styles.buttonText}>{this.state.text}</Text>
        </Animated.View>
      </View>
    )
  }
};
reactMixin(TextFader.prototype, TimerMixin);

export default TextFader;
