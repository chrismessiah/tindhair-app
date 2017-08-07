import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import Spinner from '../../components/animations/spinner/';
import styles from './styles';
import globalStyles from '../../styles';

class PostAuth extends React.Component {
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenBoth]}>
        <Spinner source={require('../../assets/images/logomark-white.png')} style={{width: 70, height: 70}} />
      </View>
    )
  }
};

export default PostAuth;
