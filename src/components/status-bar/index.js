import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

import styles from './styles';

class MainStatusBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { bgColor } = this.props;
    return (
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={this.props.androidBarBgColor} // android only
        />
        {(Platform.OS === 'ios') ? <View style={[styles.statusbar, {backgroundColor: bgColor}]}></View> : null}
      </View>
    )
  }
}

export default MainStatusBar;
