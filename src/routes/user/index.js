import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import { fetchLikedHairstyles } from '../../actions'

class User extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/haircut.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }

  componentDidMount() {
    this.props.dispatch(fetchLikedHairstyles({token: this.props.global.access_token}))
  }

  render() {
    return (
      <ScrollView contentContainerStyle={globalStyles.centerChildrenHorizontal} style={[globalStyles.coverBackground, styles.background]}>
        {this.props.global.likedHairstyles ?
          <View style={styles.hairstyleContainer}>
            {this.props.global.likedHairstyles.map(hairstyle => {
              return <Card {...hairstyle} key={`liked-${hairstyle.id}`}/>
            })}
          </View>
        :
          <Text>Loading</Text>
        }
      </ScrollView>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(User)
