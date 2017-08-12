import { StackNavigator } from 'react-navigation';

import LoginSelection from './routes/login-selection/';
import EmailLogin from './routes/email-login/';
import GenderSelection from './routes/gender-selection/';
import Loader from './routes/loader/';
import PostAuth from './routes/post-auth/';
import Main from './routes/main/';

const AppNavigator = StackNavigator(
  {
    LoginSelection: {
      screen: LoginSelection,
      navigationOptions: {header: false},
    },
    EmailLogin: {
      screen: EmailLogin,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    GenderSelection: {
      screen: GenderSelection,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    Loader: {
      screen: Loader,
      navigationOptions: {header: false}, // change to this in prod
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    PostAuth: {
      screen: PostAuth,
      navigationOptions: {header: false},
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffffff'},
      }
    },
  },
  {
    initialRouteName: 'LoginSelection',
  }
);

export default AppNavigator;
