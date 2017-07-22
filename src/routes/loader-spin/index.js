import React from 'react';
import { View, Image } from 'react-native';

import Spinner from '../../components/animations/spinner/';
import styles from './styles';
import globalStyles from '../../styles';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenBoth]}>
        <Spinner source={require('../../assets/images/logomark-white.png')} style={{width: 70, height: 70}} />
      </View>
    )
  }
};

export default Loader;
