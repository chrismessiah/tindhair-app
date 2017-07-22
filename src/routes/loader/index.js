import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import TextFader from '../../components/faders/text-fader/';
import styles from './styles';
import globalStyles from '../../styles';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.loopValues = [
      'Creating account',
      'Fecthing hairstyles',
      'Grooming hair',
      'Breeding hair models',
      'Just joking'
    ];
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background]}>
        <TextFader loopValues={this.loopValues} style={globalStyles.centerChildrenBoth}/>
      </View>
    )
  }
};

export default Loader;
