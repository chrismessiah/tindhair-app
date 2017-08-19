import React from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
var ImagePicker = require('react-native-image-picker');
var base64 = require('base-64');

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import GradientButton from '../../components/buttons/gradient-button/';
import ToggleButton from '../../components/buttons/toggle-button/';
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
      <Image source={require('../../assets/images/haircut.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }

  componentDidMount() {
    this.props.dispatch(fetchLikedHairstyles({token: this.props.global.access_token}))
    this.props.dispatch(fetchMyHairstyles({token: this.props.global.access_token}))
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
      <ScrollView contentContainerStyle={styles.scrollContainer} style={[globalStyles.coverBackground, styles.background]}>
        <ToggleButton color1={'#F26D4D'} color2={'white'} value1={'Liked hairstyles'} value2={'Your hairstyles'} onPress={this._toggleTab} style={{marginTop: 20}}/>

        {this.state.mode === 2 ? <GradientButton onPress={this._goToCamera} colors={['#FF5E00', '#FBB869']} value={'Upload your hairstyle'}/> : null}

        <ActivityIndicator animating={this.props.global.uploading}/>

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
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(User)
