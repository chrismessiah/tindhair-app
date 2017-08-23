import React from 'react';
import { View, ScrollView, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux'
var _ = require('lodash');

import Header from '../../components/headers/main/';
import { fetchHairstyles } from '../../actions/';

import styles from './styles';
import globalStyles from '../../styles';

const ROW_HEIGHT = styles.row.height + styles.row.marginBottom;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/search.png')} style={{width: 21, height: 22, tintColor: tintColor}} />
    ),
  }
  constructor(props) {
    super(props);
    this.state = {
      showedRows: 10,
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  _buildGridArray = () => {
    let hairstyles = this._getShowedHairstyles(this.state.showedRows);
    if (!hairstyles) {return(<Text>Loading</Text>)}
    let sum = [];
    for (var i = 0; i < hairstyles.length; i+=3) {
      let hairstyleArray = [hairstyles[i]];
      if (i+1 < hairstyles.length) hairstyleArray.push(hairstyles[i+1]);
      if (i+2 < hairstyles.length) hairstyleArray.push(hairstyles[i+2]);

      var tempSum = [];
      for (var i2 = 0; i2 < hairstyleArray.length; i2++) {
        let marginStyle = {};
        if (i2 === 0) {
          marginStyle = {marginRight: 5};
        } else if (i2 === 2) {
          marginStyle = {marginLeft: 5};
        }
        tempSum.push(<Image key={`im-${i}-${i2}`} source={{uri: hairstyleArray[i2].image.tiny}} style={[styles.image, marginStyle]} />);
      }
      sum.push(<View key={`vi-${i}`} style={styles.row}>{tempSum}</View>);
    }
    return sum;
  }
  _onScroll = (e) => {
    const scrolled = e.nativeEvent.contentOffset.y;
    const scrolledRows = Math.floor(scrolled/ROW_HEIGHT)
    const maxDisplayedRows = Math.floor(DEVICE_HEIGHT/ROW_HEIGHT);
    const rowsLeft = this.state.showedRows - (scrolledRows+maxDisplayedRows)
    if (rowsLeft <= 3) {
        this.setState({...this.state, showedRows: this.state.showedRows+3})
    }
  }
  _onLayout = (e) => {
    const showedRows = Math.round(e.nativeEvent.layout.height/ROW_HEIGHT);
    this.setState({...this.state, showedRows: showedRows});
  }
  _getShowedHairstyles = (rows) => {
    if (!this.props.global.hairstyles) return;
    let hairstyles = _.cloneDeep(this.props.global.hairstyles);
    hairstyles.splice(rows*3);
    return hairstyles;
  }
  render() {
    return (
      <View style={globalStyles.coverBackground}>
        <Header bgColor={'#FAFAFA'} androidBarBgColor={'#F0F0F0'} style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Discover</Text>
        </Header>

        <ScrollView onScroll={this._onScroll} showsVerticalScrollIndicator={true} scrollEventThrottle={500}>
          <View onLayout={this._onLayout}>
            {this._buildGridArray()}
          </View>
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

export default connect(mapStateToProps)(Settings)
