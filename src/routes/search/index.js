import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux'

import Header from '../../components/headers/main/';
import { fetchHairstyles } from '../../actions/';

import styles from './styles';
import globalStyles from '../../styles';

class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../../assets/images/search.png')} style={{width: 21, height: 22, tintColor: tintColor}} />
    ),
  }
  componentDidMount() {
    this.props.dispatch(fetchHairstyles({token: this.props.global.access_token}));
  }
  _buildGridArray = (hairstyles) => {
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
        tempSum.push(<Image key={`im-${i}-${i2}`} source={{uri: hairstyleArray[i2].image.tiny}} style={[{width: 122, height: 122}, marginStyle]} />);
      }
      sum.push(<View key={`vi-${i}`} style={styles.row}>{tempSum}</View>);
    }
    return sum;
  }
  render() {
    return (
      <View style={globalStyles.coverBackground}>
        <Header bgColor={'#FAFAFA'} androidBarBgColor={'#F0F0F0'} style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Discover</Text>
        </Header>

        <ScrollView contentContainerStyle={styles.scrollContainer} >
          {this._buildGridArray(this.props.global.hairstyles)}
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
