import React from 'react';
import { Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import styles from './styles';

class Card extends React.Component {
  render() {
    return (
      <View style={[styles.card]}>
        <Image style={styles.image} source={{uri: this.props.image_url}}/>
        <View>
          <Text>{this.props.name} - {this.props.likes}</Text>
        </View>
      </View>
    )
  }
}

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
  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  },
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  },
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  },
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.props.cards}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
})
