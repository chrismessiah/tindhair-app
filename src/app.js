import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './router'

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}/>
    )
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
