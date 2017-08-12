import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';
import { fetchHairstyles } from '../../actions/';
import ColorButton from '../../components/buttons/color-button/';

class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/cogwheel.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }
  constructor(props) {
    super(props)
    this.state = {
      // index: 0,
      // messageText: 'Loading hairstyles',
      // hairstyle: null,
    }
  }
  componentDidMount() {
    //this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>

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
