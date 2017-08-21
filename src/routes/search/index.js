import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';

class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/search.png')} style={{width: 21, height: 22, tintColor: tintColor}} />
    ),
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, globalStyles.centerChildrenHorizontal, styles.background]}>

      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(Settings)
