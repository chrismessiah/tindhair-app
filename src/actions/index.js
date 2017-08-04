import * as c from '../constants'
import { login, signup } from '../api/'

// *********** MY OWN CODE ***********

// **************** LOGIN ***************

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginTry())
    login({email: email, password: password})
    .then(data => dispatch(loginSuccess(data)))
    .catch((err) => dispatch(loginFail(err)));
  }
}

export function loginTry() {
  return {
    type: c.LOGIN_TRY
  }
}

export function loginSuccess() {
  return {
    type: c.LOGIN_SUCCESS,
    data,
  }
}

export function loginFail(data) {
  return {
    type: c.LOGIN_FAIL,
    data,
  }
}

// **************** SIGNUP ***************

export function signupUser(fullname, email, password, gender) {
  return (dispatch) => {
    dispatch(signupTry())
    signup({email: email, password: password, gender: gender, fullname: fullname})
    .then(data => dispatch(signupSuccess(data)))
    .catch((err) => dispatch(signupFail(err)));
  }
}

export function storeSignupDetails(data) {
  return {
    type: c.STORE_SIGNUP_DETAILS,
    data
  }
}

export function signupTry() {
  return {
    type: c.SIGNUP_TRY
  }
}

export function signupSuccess() {
  return {
    type: c.SIGNUP_SUCCESS,
    data,
  }
}

export function signupFail(data) {
  return {
    type: c.SIGNUP_FAIL,
    data,
  }
}






/*
* The fetchData function is now a thunk. When fetchData is called, it returns
* a function that will then dispatch the getData action. Then, getPeople is
* called. Once getPeople resolves, it will then dispatch the getDataSuccess action.
*/
export function fetchData() {
  return (dispatch) => {
    dispatch(getData())
    getPeople()
      .then((data) => {
        dispatch(getDataSuccess(data))
      });
  }
}
