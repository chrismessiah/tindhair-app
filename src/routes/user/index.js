import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'
import Slider from "react-native-slider";

import styles from './styles';
import globalStyles from '../../styles';

import SwipeCard from './swipe-card/';
import GradientButton from '../../components/buttons/gradient-button/';
import ToggleButton from '../../components/buttons/toggle-button/';
import TextButton from '../../components/buttons/text-button/'
import ColorButton from '../../components/buttons/color-button/';
import Header from '../../components/headers/main/'
import {
  fetchLikedHairstyles,
  fetchMyHairstyles,
  logout,
  deleteAccount,
  changeGender,
  deleteHairstyle,
  removeLike,
} from '../../actions';

class User extends React.Component {
  static navigationOptions = { tabBarIcon: ({ tintColor }) => (<Image source={require('../../assets/images/user.png')} style={{width: 22, height: 22, tintColor: tintColor}} />)}
  constructor(props) {
    super(props)
    this.state = {
      tab: 1,
      subTab: 1,
      gender: this._genderToNum(props.global.user.gender),
    }
  }
  _genderToNum = (string) => {
    if (string === 'M') return 1; if (string === 'O') return 2; if (string === 'F') return 3;
  }
  _numToGender = (num) => {
    if (num === 1) return 'M'; if (num === 2) return 'O'; if (num === 3) return 'F';
  }
  _changeGender = (value) => {
    this.setState({...this.state, gender: value});
    this.props.dispatch(changeGender({token: this.props.global.access_token, gender: this._numToGender(value)}));
  }
  componentDidMount() {
    this.props.dispatch(fetchLikedHairstyles({token: this.props.global.access_token}))
    this.props.dispatch(fetchMyHairstyles({token: this.props.global.access_token}))
  }
  _goToCamera = () => {
    this.props.navigation.navigate('Upload');
  }
  _toggleTab = (num) => {
    if (this.refs.scrollView) this.refs.scrollView.scrollTo({x:0, y:0, animated:false});
    this.setState({...this.state, tab: num, subTab: 1});
  }

  _toggleSubTab = (num) => {
    this.setState({...this.state, subTab: num});
  }
  _removeLike = (hairstyleId) => {
    this.props.dispatch(removeLike({hairstyle_id: hairstyleId, token: this.props.global.access_token}))
  }
  _removeHairstyle = (hairstyleId) => {
    this.props.dispatch(deleteHairstyle({id: hairstyleId, token: this.props.global.access_token}))
  }
  render() {
    let activeHairstyles;
    if (this.props.global.likedHairstyles && this.props.global.myHairstyles) {
      activeHairstyles = (this.state.tab === 1) ? this.props.global.likedHairstyles : this.props.global.myHairstyles;
    }

    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        <Header bgColor={'#FAFAFA'} androidBarBgColor={'#F0F0F0'} style={styles.header}>
          <TextButton value={'LIKES'} activeTextStyle={styles.headerActiveText} textStyle={styles.headerText} onPress={() => this._toggleTab(1)} active={this.state.tab === 1}/>
          <TextButton value={'YOU'} activeTextStyle={styles.headerActiveText} textStyle={styles.headerText} onPress={() => this._toggleTab(2)} active={this.state.tab === 2}/>
        </Header>

        <ScrollView contentContainerStyle={styles.scrollContainer} ref={'scrollView'}>
          {this.state.tab === 2 ? <ToggleButton style={{marginTop: 20}} onPress={this._toggleSubTab} activeButton={this.state.subTab}/> : null}

          {activeHairstyles && !(this.state.tab === 2 && this.state.subTab === 2) ? activeHairstyles.map(hairstyle => {
            return( <SwipeCard callbackRemove={(this.state.tab === 1) ? this._removeLike : this._removeHairstyle} key={`SwipeCard-${hairstyle.id}`} hairstyle={hairstyle}/> )})
          : null }

          {activeHairstyles && this.state.tab === 2 && this.state.subTab === 1 ? <GradientButton style={styles.gradientButton} onPress={this._goToCamera} colors={['#FF5E00', '#FBB869']} value={'Upload your hairstyle'}/> : null}
          {this.state.tab === 2 && this.state.subTab === 2 ?
            <View>
              <View style={styles.genderBlock}>
                <Text style={styles.genderHeadline}>Show me hairstyles for</Text>
                <Slider value={this.state.gender} step={1} minimumValue={1} maximumValue={3} onSlidingComplete={this._changeGender} minimumTrackTintColor={'#ffc1b4'} maximumTrackTintColor={'#ffc1b4'} thumbStyle={styles.sliderHandle}/>
                <View style={styles.genderDescriptor}>
                  <Text>Men</Text>
                  <Text style={styles.fixMiddleGender}>Both</Text>
                  <Text>Women</Text>
                </View>
              </View>
              <ColorButton style={{marginTop: 30}} value={'Log out'} onPress={() => this.props.dispatch(logout(this.props.global.screenKeys[1]))} color={'#F26D4D'} />
              <ColorButton value={'Delete account'} onPress={() => this.props.dispatch(deleteAccount({token: this.props.global.access_token}, this.props.global.screenKeys[1]))} color={'#ff4e4e'} />
            </View>
          : null}
          {!activeHairstyles ? <Text>Loading</Text> : null}
        </ScrollView>
      </View>

    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(User)
