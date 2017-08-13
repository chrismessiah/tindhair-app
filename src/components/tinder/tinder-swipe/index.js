import React from 'react';
import { Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

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
  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        renderCard={(data) => <Card {...data} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.props.callbackYes}
        handleNope={this.props.callbackNo}
        hasMaybeAction
      />
    )
  }
})
