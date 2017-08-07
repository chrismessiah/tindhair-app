import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import AppNavigator from './router'

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.alertMessage) {
      this._showAlert(nextProps.global.alertMessage);
    }
  }
  _showAlert = (data) => {
    MessageBarManager.showAlert({
      title: data.title,
      message: data.message,
      alertType: data.type,
      viewTopInset: 15,
      duration: data.duration,
    });
    setTimeout(() => {
      MessageBarManager.hideAlert();
    }, data.duration)
  }
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.global,
      })}/>
    )
  }
}
const mapStateToProps = (state) => ({
  global: state.global
});
reactMixin(App.prototype, TimerMixin);
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
