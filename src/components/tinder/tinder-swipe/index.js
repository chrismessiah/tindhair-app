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
    if (this.props.startIndex) {
      let cards = _.cloneDeep(this.props.cards);
      let element = _.cloneDeep(cards[this.props.startIndex]);
      cards.splice(this.props.startIndex, 1);
      cards.unshift(element);
      this.setState({...this.state, cards: cards})
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
