import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';
import { fetchHairstyles, nextHairstyle } from '../../actions/';
import ColorButton from '../../components/buttons/color-button/';
import SwipeCards from '../../components/tinder-module/'

class Main extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/haircut.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }
  constructor(props) {
    super(props)
    this.state = {
      messageText: 'Loading hairstyles',
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.isLoading === false && this.state.messageText != null && nextProps.global.hairstyleIndex < nextProps.global.hairstyles.length-1) {
      this.setState({...this.state, messageText: null})
    }
  }
  render() {
    let {hairstyles, hairstyleIndex} = this.props.global;
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        {this.state.messageText ?
          <View style={globalStyles.coverBackground, globalStyles.centerChildrenBoth}>
            <Text>{this.state.messageText}</Text>
          </View>
        :
          <SwipeCards style={{flex: 1}} cards={hairstyles} callbackYes={''} callbackNo={''}/>
        }
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(Main)
