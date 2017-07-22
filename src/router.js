import { StackNavigator } from 'react-navigation';

import LoginSelection from './routes/login-selection/';
import EmailLogin from './routes/email-login/';
import GenderSelection from './routes/gender-selection/';
import Loader from './routes/loader/';
import LoaderSpin from './routes/loader-spin/';

const App = StackNavigator(
  {
    LoginSelection: {
      screen: LoaderSpin,
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    },
    // LoginSelection: {
    //   screen: LoginSelection,
    //   navigationOptions: {header: false},
    // },
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
      //navigationOptions: {header: false}, // change to this in prod
      navigationOptions: {
        headerStyle: {backgroundColor: '#ffe0d9'},
      }
    }
  },
  {
    initialRouteName: 'LoginSelection',
  }
);

export default App;
