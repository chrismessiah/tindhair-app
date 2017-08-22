import React from 'react';
import { View, ScrollView, Image, Text, Platform } from 'react-native';
import { connect } from 'react-redux'

const imagePicker = require('react-native-image-picker');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const RNFS = require('react-native-fs');

import ColorButton from '../../components/buttons/color-button/';
import TextInput from '../../components/inputs/text-input/';
import Card from '../../components/tinder/tinder-card/';
import Header from '../../components/headers/main/';
import { sendHairstyle, showMessage, fetchMyHairstyles } from '../../actions/';

import styles from './styles';
import globalStyles from '../../styles';

class UploadHairstyle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hairstyle: {
        image: null,
        name: '',
        likes: 0,
      },
      filename: null,
    }
    this.photoOptions = { title: 'Upload hairstyle', storageOptions: {skipBackup: true, path: 'images'} };
  }
  static navigationOptions = {
    title: 'Upload hairstyle',
    tabBarVisible: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.uploading) {
      loaderHandler.showLoader("Uploading");
    } else {
      loaderHandler.hideLoader();
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchMyHairstyles({token: this.props.global.access_token}));
  }
  _takePhoto = () => {
    imagePicker.showImagePicker(this.photoOptions, (response) => {
      if (response.error) throw response.error;
      if (!response.didCancel) {
        if (Platform.OS === 'ios') {
          RNFS.writeFile(`${RNFS.MainBundlePath}/${response.fileName}`, response.data, 'base64')
          .then(success => {
            this.setState({...this.state, filename: response.fileName, hairstyle: {...this.state.hairstyle, image: {small: `${RNFS.MainBundlePath}/${response.fileName}`} }});
          }).catch(err => {console.log(err);});
        } else {
          this.setState({...this.state, filename: response.fileName, hairstyle: {...this.state.hairstyle, image: {small: response.uri} }});
        }
      }
    });
  }
  _sendHairstyle = () => {
    if (!this.state.hairstyle.image || !this.state.filename) return this.props.dispatch(showMessage({title: 'Error', message: 'You haven\'t selected a photo', type: 'error'}));;
    if (!this.state.hairstyle.name) return this.props.dispatch(showMessage({title: 'Error', message: 'You haven\'t named your hairstyle', type: 'error'}));;

    const { image, name } =  this.state.hairstyle;
    const { user, access_token } = this.props.global;
    data = { name: name, gender: user.gender, uri: image.small, token: access_token };
    this.props.dispatch(sendHairstyle(data));
  }
  _updateName = (text) => {
    this.setState({...this.state, hairstyle: {...this.state.hairstyle, name: text} })
  }
  render() {
    return(
      <View style={[globalStyles.coverBackground, globalStyles.centerChildrenHorizontal, styles.background]}>
          <Card {...this.state.hairstyle} style={{marginTop: 30}}/>
          <TextInput onType={this._updateName} placeholder={this.state.name || 'Unnamed hairstyle'} textColor={'#444444'}/>
          <ColorButton onPress={this._takePhoto} value={'Select Photo'} color={'#F26D4D'}/>
          <ColorButton onPress={this._sendHairstyle} value={'Upload'} color={'#F26D4D'}/>
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(UploadHairstyle)
