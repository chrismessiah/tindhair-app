import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'
var ImagePicker = require('react-native-image-picker');
var base64 = require('base-64');

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import GradientButton from '../../components/buttons/gradient-button/';
import { fetchLikedHairstyles, sendHairstyle } from '../../actions'

class User extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/haircut.png')} style={{width: 22, height: 22, tintColor: tintColor}} />
    ),
  }

  componentDidMount() {
    this.props.dispatch(fetchLikedHairstyles({token: this.props.global.access_token}))
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
        data = {
          name: fullname,
          gender: gender,
          //file: base64.decode(response.data),
          uri: response.uri,
          fileUpload: true,
          token: this.props.global.access_token
        }
        this.props.dispatch(sendHairstyle(data));
        //console.log(response.data);
        // let source = { uri: response.uri };
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   ...this.state,
        //   avatarSource: source,
        // });
      }
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer} style={[globalStyles.coverBackground, styles.background]}>
        <GradientButton onPress={this._goToCamera} colors={['#FF5E00', '#FBB869']} value={'Upload your hairstyle'}/>
        {this.props.global.likedHairstyles ?
          <View>
            {this.props.global.likedHairstyles.map(hairstyle => {
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
