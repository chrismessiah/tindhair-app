import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { START_SCREEN } from './constants'


import Splash from './routes/splash/';
import LoginSelection from './routes/login-selection/';
import EmailLogin from './routes/email-login/';
import GenderSelection from './routes/gender-selection/';
import Loader from './routes/loader/';
import PostAuth from './routes/post-auth/';

import Search from './routes/search/';
import Main from './routes/main/';
import User from './routes/user/';
import UploadHairstyle from './routes/upload-hairstyle/';

const MainApp = StackNavigator(
  {
    Main2: {screen: Main, navigationOptions: {header: false}},
    Upload: {screen: UploadHairstyle, navigationOptions: {headerStyle: {backgroundColor: '#FAFAFA'}} },
  },
  { initialRouteName: 'Main2' }
)

const UserApp = StackNavigator(
  {
    User2: {screen: User, navigationOptions: {header: false}},
    Upload: {screen: UploadHairstyle, navigationOptions: {headerStyle: {backgroundColor: '#FAFAFA'}} },
  },
  { initialRouteName: 'User2' }
)

const HairstyleApp = TabNavigator(
  {
    Search: {screen: Search, navigationOptions: {gesturesEnabled: false} },
    Main: {screen: MainApp, navigationOptions: {gesturesEnabled: false} },
    User: {screen: UserApp, navigationOptions: {gesturesEnabled: false} },
  },
  {
    initialRouteName: 'Main',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#262626',
      style: { backgroundColor: '#FAFAFA' },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
  }
);

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
      screen: HairstyleApp,
      navigationOptions: {header: false},
    },
  },
  { initialRouteName: START_SCREEN }
);

export default AppNavigator;
