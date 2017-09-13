import React from 'react';
import { View, Image, Text, StatusBar } from 'react-native';

import GradientButton from '../../components/buttons/gradient-button/';
import styles from './styles';
import globalStyles from '../../styles';

import { connect } from 'react-redux'
import { fetchData } from '../../actions/'

class LoginSelection extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={globalStyles.coverBackground} >
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        {this.props.global.isFetching && <Text>Loading</Text>}
        <View style={[globalStyles.centerChildrenHorizontal, styles.buttonContainer]}>
          {/* Due to a bug with the FBSDK Facebook login is currently not an option */}
          {/* <GradientButton onPress={() => { }} style={styles.fbButton} colors={['#1B4DFF', '#5CA1FF']} value={"Log in with Facebook"}/> */}
          <GradientButton onPress={() => {this.props.navigation.navigate('EmailLogin')}} style={styles.emailButton} colors={['#ff5d00', '#fcb060']} value={"Login"}/>
        </View>
      </Image>
    );
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(LoginSelection)
