import React from 'react';
import { Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import _ from 'lodash';

import styles from './styles';
import Card from '../tinder-card/';

class NoMoreCards extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>Whoa! We ran out of hairstyles!</Text>
      </View>
    )
  }
}


export default React.createClass({
  getInitialState() {
    return {cards: this.props.cards};
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.startIndex !== null && nextProps.startIndex >= 0) {
      let cards = _.cloneDeep(nextProps.cards);
      let element = _.cloneDeep(cards[nextProps.startIndex]);
      cards.splice(nextProps.startIndex, 1);
      cards.unshift(element);
      this.setState({...this.state, cards: cards})
    } else if (this.props.startIndex !== null && this.props.startIndex >= 0 && nextProps.startIndex === null) {
      return; // don't update state if startIndex is just being reset
    } else {
      this.setState({...this.state, cards: nextProps.cards})
    }
  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(data) => <Card {...data} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.props.callbackYes}
        handleNope={this.props.callbackNo}
        loop={true}
        onLoop={this.props.handleLoop}
        hasMaybeAction
      />
    )
  }
})
