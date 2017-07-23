import React from 'react'
import { View } from 'react-native'

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class MessageWrapper extends React.Component {
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
  }
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
        <MessageBarAlert ref="alert" />
      </View>
    )
  }
}

export default MessageWrapper;
