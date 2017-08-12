import { StackNavigator } from 'react-navigation';
import { START_SCREEN } from './constants'


import Splash from './routes/splash/';
import LoginSelection from './routes/login-selection/';
import EmailLogin from './routes/email-login/';
import GenderSelection from './routes/gender-selection/';
import Loader from './routes/loader/';
import PostAuth from './routes/post-auth/';
import Main from './routes/main/';

const AppNavigator = StackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {header: false},
    },
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
      navigationOptions: {header: false},
    },
    PostAuth: {
      screen: PostAuth,
      navigationOptions: {header: false},
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffffff'},
      }
    },
  },
  {
    initialRouteName: START_SCREEN,
  }
);

export default AppNavigator;
