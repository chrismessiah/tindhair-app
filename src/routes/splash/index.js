import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';
import { checkIfLoggedIn } from '../../actions/'

class Splash extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkIfLoggedIn());
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, globalStyles.centerChildrenBoth, styles.background]}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(Splash)
