import * as c from '../constants'
const initialState = {
  isLoading: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  console.log('Datareducer ran');
  switch (action.type) {
    case c.LOGIN_TRY:
      return {
        ...state,
        //data: [],
        isLoading: true,
      }
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        //data: action.data,
        isLoading: false,
      }
    case c.LOGIN_FAIL:
      return {
        ...state,
        //data: action.data,
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
