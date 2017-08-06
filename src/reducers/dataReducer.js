import * as c from '../constants'
import AppNavigator from '../router'

let initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginSelection'));
initialState = {
  ...initialState,
    isLoading: false,
    error: false
};

export default function dataReducer (state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  if (nextState) return nextState;

  switch (action.type) {
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
