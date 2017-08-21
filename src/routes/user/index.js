import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'
var ImagePicker = require('react-native-image-picker');
var base64 = require('base-64');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import GradientButton from '../../components/buttons/gradient-button/';
import ToggleButton from '../../components/buttons/toggle-button/';
import TextButton from '../../components/buttons/text-button/'
import Header from '../../components/headers/main/'
import { fetchLikedHairstyles, sendHairstyle, fetchMyHairstyles } from '../../actions'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 1
    }
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/user.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }
  componentDidMount() {
    this.props.dispatch(fetchLikedHairstyles({token: this.props.global.access_token}))
    this.props.dispatch(fetchMyHairstyles({token: this.props.global.access_token}))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.uploading) {
      loaderHandler.showLoader("Uploading hairstyle");
    } else {
      loaderHandler.hideLoader();
    }
  }
  _goToCamera = () => {
    const options = {
      title: 'Upload hairstyle',
      storageOptions: {skipBackup: true, path: 'images'}
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) throw response.error;
      if (!response.didCancel) {
        const {fullname, gender} =  this.props.global.user;
        data = { name: fullname, gender: gender, uri: response.uri, token: this.props.global.access_token };
        this.props.dispatch(sendHairstyle(data));
      }
    });
  }
  _toggleTab = (num) => {
    this.setState({...this.state, mode: num});
  }
  render() {
    let activeHairstyles;
    if (this.props.global.likedHairstyles && this.props.global.myHairstyles) {
      activeHairstyles = (this.state.mode === 1) ? this.props.global.likedHairstyles : this.props.global.myHairstyles;
    }

    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        <Header bgColor={'#FAFAFA'} androidBarBgColor={'#F0F0F0'} style={styles.header}>
          <TextButton value={'LIKES'} activeTextStyle={styles.headerActiveText} textStyle={styles.headerText} onPress={() => this._toggleTab(1)} active={this.state.mode === 1}/>
          <TextButton value={'YOU'} activeTextStyle={styles.headerActiveText} textStyle={styles.headerText} onPress={() => this._toggleTab(2)} active={this.state.mode === 2}/>
        </Header>

        <ScrollView contentContainerStyle={styles.scrollContainer} >
          {this.state.mode === 2 ? <GradientButton style={styles.gradientButton} onPress={this._goToCamera} colors={['#FF5E00', '#FBB869']} value={'Upload your hairstyle'}/> : null}

          {activeHairstyles ?
            <View>
              {activeHairstyles.map(hairstyle => {
                return <Card {...hairstyle} key={`liked-${hairstyle.id}`}/>
              })}
            </View>
          :
            <Text>Loading</Text>
          }
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
