import * as c from '../constants'
import { login, signup } from '../api/'
import { NavigationActions } from 'react-navigation';

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

export function signupUser(fullname, email, password, gender, backToScreenKey) {
  return (dispatch) => {
    dispatch(signupTry())
    dispatch(NavigationActions.navigate({routeName: 'PostAuth'}));
    signup({email: email, password: password, gender: gender, fullname: fullname})
    .then(data => {
      dispatch(signupSuccess());
      dispatch(NavigationActions.back({key: backToScreenKey}));
      setTimeout(() => {
        dispatch(showMessage({title: 'Success', message: 'Please check your mail to verify your account', type: 'success'}))
      }, 500);
    })
    .catch((err) => {
      dispatch(signupFail());
      dispatch(NavigationActions.back({key: backToScreenKey}));
      setTimeout(() => {
        dispatch(showMessage({title: `Error ${err.code}`, message: err.message, type: 'error'}))
      }, 500);
    });
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
    type: c.SIGNUP_SUCCESS
  }
}

export function signupFail() {
  return {
    type: c.SIGNUP_FAIL
  }
}


// **************** MESSAGES ***************

export function showMessage(data) {
  return (dispatch) => {
    dispatch(setMessage(data));
    setTimeout(() => {
      dispatch(nullifyMessage());
    }, 50);
  }
}

export function setMessage(data) {
  return {
    type: c.SET_MESSAGE,
    data,
  }
}

export function nullifyMessage() {
  return {
    type: c.NULLIFY_MESSAGE,
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
