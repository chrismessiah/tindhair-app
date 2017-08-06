import * as c from '../constants'
import AppNavigator from '../router'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginSelection'));

export default function navReducer (state = initialState, action) {
  console.log('Nav ran');
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}
