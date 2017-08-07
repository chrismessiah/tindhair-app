import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import AppWithNavigationState from './app';
import configureStore from './configureStore';
import MessageWrapper from './components/wrappers/message-wrapper/';

const store = configureStore();

class ReduxApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MessageWrapper>
          <AppWithNavigationState />
        </MessageWrapper>
      </Provider>
    )
  }
}


export default ReduxApp;
