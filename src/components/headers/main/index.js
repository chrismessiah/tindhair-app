import React from 'react';
import { View, Image, Text } from 'react-native';
import StatusBar from '../../status-bar/';

import styles from './styles';

class MainHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { bgColor, androidBarBgColor, children, style } = this.props;
    return (
      <View>
        <StatusBar bgColor={bgColor} androidBarBgColor={androidBarBgColor}/>
        <View style={[styles.header, {backgroundColor: bgColor}, style]}>
          {children}
        </View>
      </View>
    )
  }
}

export default MainHeader;
