import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

import styles from './styles';

class MainStatusBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { bgColor, translucent } = this.props;
    return (
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={this.props.androidBarBgColor} // android only
          translucent={translucent}
        />
        {(Platform.OS === 'ios') ? <View style={[styles.statusbar, {backgroundColor: bgColor}]}></View> : null}
      </View>
    )
  }
}

export default MainStatusBar;
