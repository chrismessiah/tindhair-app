import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './styles';

class Card extends React.Component {
  render() {
    return (
      <View style={[styles.card, this.props.style]}>
        <View style={styles.canvas}>
          <Image style={styles.image} source={(this.props.image && this.props.image.small) ? {uri: this.props.image.small} : require('../../../assets/images/no-avatar.png')}/>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.props.name || 'Unnamed hairstyle'}</Text>
            <View style={styles.heartContainer}>
              <Text style={styles.heartText}>{this.props.likes || 0}</Text>
              <Image style={styles.heartImage} source={require('../../../assets/images/heart.png')}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Card;
