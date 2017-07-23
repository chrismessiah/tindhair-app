import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import App from './router';
import configureStore from './configureStore';
import MessageWrapper from './components/wrappers/message-wrapper/';

const store = configureStore();

class ReduxApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MessageWrapper>
          <App />
        </MessageWrapper>
      </Provider>
    )
  }
}

export default ReduxApp;
