import * as c from '../constants'
import AppNavigator from '../router'
import { START_SCREEN } from '../constants'

let initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(START_SCREEN));
initialState = {
  ...initialState,
    isLoading: false,
    error: false,
    screenKeys: [],
    alertMessage: null,
    access_token: null,
    refresh_token: null,
    hairstyles: null,
};

export default function dataReducer (state = initialState, action) {
  let tempState, nextState, nextScreenKeys;

  switch (action.type) {



    // ****************** NAVIGATION ************************
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


    // ****************** DATA ************************
    case c.FETCH_HAIRSTYLES_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.FETCH_HAIRSTYLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hairstyles: action.data.hairstyles
      }
    case c.STORE_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.data
      }
    case c.STORE_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.data
      }
    case c.SET_MESSAGE:
      return {
        ...state,
        alertMessage: {
          title: action.data.title,
          message: action.data.message,
          type: action.data.type,
          duration: action.data.duration || 3000,
        }
      }
    case c.HIGHLIGHT_LOG_IN:
      return {
        ...state,
        highlight: 'L'
      }
    case c.NULLIFY_MESSAGE:
      return {
        ...state,
        alertMessage: null,
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
