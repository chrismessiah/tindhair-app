import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import styles from './styles';
import globalStyles from '../../styles';

import Card from '../../components/tinder/tinder-card/';
import GradientButton from '../../components/buttons/gradient-button/';
import ToggleButton from '../../components/buttons/toggle-button/';
import TextButton from '../../components/buttons/text-button/'
import ColorButton from '../../components/buttons/color-button/';
import Header from '../../components/headers/main/'
import { fetchLikedHairstyles, fetchMyHairstyles, logout, deleteAccount } from '../../actions';

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 1,
      subTab: 1,
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

          {activeHairstyles && !(this.state.tab === 2 && this.state.subTab === 2) ?
            <View>
              {activeHairstyles.map(hairstyle => {
                return <Card {...hairstyle} key={`liked-${hairstyle.id}`}/>
              })}
            </View>
          : null }

          {activeHairstyles && this.state.tab === 2 && this.state.subTab === 1 ? <GradientButton style={styles.gradientButton} onPress={this._goToCamera} colors={['#FF5E00', '#FBB869']} value={'Upload your hairstyle'}/> : null}
          {this.state.tab === 2 && this.state.subTab === 2 ?
            <View>
              <ColorButton value={'Log out'} onPress={() => this.props.dispatch(logout(this.props.global.screenKeys[1]))} color={'#F26D4D'} />
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
