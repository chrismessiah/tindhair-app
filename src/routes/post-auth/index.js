import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import Spinner from '../../components/animations/spinner/';
import styles from './styles';
import globalStyles from '../../styles';

class PostAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.global.signupSuccess) {
      if (nextProps.global.signupSuccess === true) {
        this.props.navigation.navigate('PostAuth');
      } else {
        const backAction = NavigationActions.back({key: 'EmailLogin'});
        this.props.navigation.dispatch(backAction);
      }
    }
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenBoth]}>
        <Spinner source={require('../../assets/images/logomark-white.png')} style={{width: 70, height: 70}} />
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(PostAuth);
