import * as c from '../constants'
import AppNavigator from '../router'

let initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginSelection'));
initialState = {
  ...initialState,
    isLoading: false,
    error: false,
    screenKeys: [],
};

export default function dataReducer (state = initialState, action) {
  let tempState, nextState, nextScreenKeys;

  switch (action.type) {
    case "Navigation/NAVIGATE":
      tempState = AppNavigator.router.getStateForAction(action, state);
      const lastRouteKey = tempState.routes[tempState.routes.length-1].key;
      nextScreenKeys = tempState.screenKeys;
      nextScreenKeys.push(lastRouteKey);
      return {
        ...tempState,
        screenKeys: nextScreenKeys
      }
    case "Navigation/BACK":
      tempState = AppNavigator.router.getStateForAction(action, state);
      nextScreenKeys = tempState.screenKeys;
      if (action.key) {
        nextScreenKeys = tempState.screenKeys;
        let indexToPopTo = nextScreenKeys.indexOf(action.key);
        if (indexToPopTo === -1) throw 'Error: given key not in screenKeys';
        const start = nextScreenKeys.length;
        for (var i = start; i > indexToPopTo; i--) {
          nextScreenKeys.pop();
        }
      } else {
        nextScreenKeys.pop();
      }
      return {
        ...tempState,
        screenKeys: nextScreenKeys
      }
    case c.LOGIN_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case c.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    case c.STORE_SIGNUP_DETAILS:
      return {
        ...state,
        fullname: action.data.fullname,
        email: action.data.email,
        password: action.data.password,
      }
    case c.SIGNUP_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.SIGNUP_FAIL:
      return {
        ...state,
        signupSuccess: false,
        isLoading: false,
      }
    case c.SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        isLoading: false,
      }
    default:
      return state
  }
}
