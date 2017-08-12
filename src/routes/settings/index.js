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
      index: 0,
      messageText: 'Loading hairstyles',
      hairstyle: null,
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
    if (this.props.global.hairstyles.length-1 > newIndex) {
      this.setState({
        ...this.state,
        index: newIndex,
        hairstyle: this.props.global.hairstyles[newIndex],
      })
    } else {
      this.setState({
        ...this.state,
        hairstyle: null,
        messageText: 'Whoa! We ran out of hairstyles!',
      })
    }
  }
  render() {
    let {hairstyle} = this.state;
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        {hairstyle ?
          <View>
            <Image style={styles.image} source={{uri: hairstyle.image_url}}/>
            <Text>{hairstyle.name} - {hairstyle.likes}</Text>
            <ColorButton onPress={() => {this._setNextHairstyle(this.state.index+1)}} color={'#5f74e4'} value={'Next style'}/>
          </View>
        :
          <View style={globalStyles.coverBackground, globalStyles.centerChildrenBoth}>
            <Text>{this.state.messageText}</Text>
          </View>
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

export default connect(mapStateToProps)(Settings)
