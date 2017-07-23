import React from 'react';
import { View } from 'react-native';

import TextFader from '../../components/animations/text-fader/';
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
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenBoth]}>
        <TextFader loopValues={this.loopValues}/>
      </View>
    )
  }
};

export default Loader;