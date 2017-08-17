import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'
import ColorButton from '../../components/buttons/color-button/';

import styles from './styles';
import globalStyles from '../../styles';

import { logout } from '../../actions/';

class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/cogwheel.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }
  componentDidMount() {
    //this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  componentWillReceiveProps(nextProps) {

  }
  _logout = () => {
    this.props.dispatch(logout(this.props.global.screenKeys[1]))
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, globalStyles.centerChildrenHorizontal, styles.background]}>
        <ColorButton onPress={this._logout} color={'#5f74e4'} value={'Log out'}/>
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
