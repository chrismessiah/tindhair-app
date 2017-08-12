import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';
import { fetchHairstyles } from '../../actions/';
import ColorButton from '../../components/buttons/color-button/';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      hairstyle: {
        image_url: 'https://lh4.ggpht.com/vkgYSVCsnqGCkvMfifD5fvoVecY6nIvyPy4UWMUafUoZDzbp-QYo5BPuTvTwyK-PPJ8=h900',
        name: 'Kitten Cut',
        likes: 999,
        id: -1,
      }
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.isLoading === false) {
      this.setState({
        ...this.state,
        index: 0,
        hairstyle: nextProps.global.hairstyles[0],
      })
    }
  }
  _setNextHairstyle = (newIndex) => {
    this.setState({
      ...this.state,
      index: newIndex,
      hairstyle: this.props.global.hairstyles[newIndex],
    })
  }
  render() {
    let {image_url, name, likes} = this.state.hairstyle;
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        <Image style={styles.image} source={{uri: image_url}}/>
        <Text>{name} - {likes}</Text>
        <ColorButton onPress={() => {this._setNextHairstyle(this.state.index+1)}} color={'#5f74e4'} value={'Next style'}/>
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
