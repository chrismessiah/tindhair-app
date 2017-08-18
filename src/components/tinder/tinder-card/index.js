import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './styles';

class Card extends React.Component {
  render() {
    let {image, name, likes} = this.props;
    return (
      <View style={[styles.card]}>
        <View style={styles.canvas}>
          <Image style={styles.image} source={{uri: image.tiny}}/>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.heartContainer}>
              <Text style={styles.heartText}>{likes}</Text>
              <Image style={styles.heartImage} source={require('../../../assets/images/heart.png')}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Card;
