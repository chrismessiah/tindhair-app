import React from 'react';
import { View, Image } from 'react-native';

import GradientButton from '../../components/buttons/gradient-button/';
import styles from './styles';
import globalStyles from '../../styles';

class LoginSelection extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/images/login-bg.jpg')} style={globalStyles.coverBackground} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={[globalStyles.centerChildrenHorizontal, styles.buttonContainer]}>
          <GradientButton style={styles.fbButton} colors={['#1B4DFF', '#5CA1FF']} value={"Log in with Facebook"}/>
          <GradientButton onPress={() => {this.props.navigation.navigate('EmailLogin')}} style={styles.emailButton} colors={['#A09E9E', '#BDBDBD']} value={"Use email instead"}/>
        </View>
      </Image>
    );
  }
};

export default LoginSelection;
