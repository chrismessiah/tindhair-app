import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';
import { fetchHairstyles, likeHairstyle } from '../../actions/';
import ColorButton from '../../components/buttons/color-button/';
import SwipeCards from '../../components/tinder/tinder-swipe'
import Header from '../../components/headers/main/';
import ImageButton from '../../components/buttons/image-button/';

class Main extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/heart.png')} style={{width: 22*1.1052631579, height: 22, tintColor: tintColor}} />
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
  _callbackYes = (hairstyle) => {
    this.props.dispatch(likeHairstyle({token: this.props.global.access_token, haristyle_id: hairstyle.id}));
  }
  _callbackNo = (hairstyle) => {

  }
  render() {
    let {hairstyles, hairstyleIndex} = this.props.global;
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        <Header bgColor={'#FAFAFA'} androidBarBgColor={'#F0F0F0'} style={styles.header}>
          <ImageButton source={require('../../assets/images/camera.png')} imageStyle={{width: 27, height: 22}}/>
          <Image source={require('../../assets/images/logo-gray.png')} style={{width: 100, height: 30, position: 'relative', top: 3}}/>
          <ImageButton imageStyle={{width: 10, height: 22}}/>
        </Header>
        {this.state.messageText ?
          <View style={globalStyles.coverBackground, globalStyles.centerChildrenBoth}>
            <Text>{this.state.messageText}</Text>
          </View>
        :
          <SwipeCards style={{flex: 1}} cards={hairstyles} callbackYes={this._callbackYes} callbackNo={this._callbackNo}/>
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
