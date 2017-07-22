import React from 'react';
import { Text, View } from 'react-native';

import ColorButton from '../../components/buttons/color-button/';
import styles from './styles';
import globalStyles from '../../styles';

class GenderSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }
  _onClick = (param) => {
    this.props.navigation.navigate('Loader')
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenHorizontal]}>
        <View style={styles.marginMedium}>
          <Text style={styles.h1}>Puh.. almost done!</Text>
          <Text style={[styles.h2, styles.marginSmall]}>Show me hairstyles for</Text>
          <ColorButton style={styles.marginHuge} onPress={() => {this._onClick()}} color={'#265BFF'} value={'Men'}/>
          <ColorButton onPress={() => {this._onClick()}} color={'#265BFF'} value={'Women'}/>
          <ColorButton onPress={() => {this._onClick()}} color={'#265BFF'} value={'Both'}/>
        </View>
      </View>
    )
  }
};

export default GenderSelection;
