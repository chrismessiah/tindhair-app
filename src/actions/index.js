import * as c from '../constants'
import { login, signup } from '../api/'
import { NavigationActions } from 'react-navigation';

// **************** LOGIN ***************

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginTry())
    login({email: email, password: password})
    .then(data => dispatch(loginSuccess(data)))
    .catch((err) => dispatch(loginFail(err)));
  }
}

const loginTry = () => {return {type: c.LOGIN_TRY}};
const loginSuccess = () => {return {type: c.LOGIN_SUCCESS}};
const loginFail = (data) => {return {type: c.LOGIN_FAIL, data}};

// **************** SIGNUP ***************

export function storeSignupDetails(data) {
  return {
    type: c.STORE_SIGNUP_DETAILS,
    data
  }
}

export function signupUser(fullname, email, password, gender, backToScreenKey) {
  return (dispatch) => {
    dispatch(signupTry())
    dispatch(NavigationActions.navigate({routeName: 'PostAuth'}));
    signup({email: email, password: password, gender: gender, fullname: fullname})
    .then(data => {
      dispatch(signupSuccess());
      return goBackToScreen(dispatch, backToScreenKey);
    }).then(() => {
      dispatch(highlightLogIn());
      dispatch(showMessage({title: 'Success', message: 'Please check your mail to verify your account', type: 'success'}))
    })
    .catch((err) => {
      dispatch(signupFail());
      goBackToScreen(dispatch, backToScreenKey)
      .then(() => {
        dispatch(showMessage({title: `Error ${err.code}`, message: err.message, type: 'error'}))
      });
    });
  }
}

const highlightLogIn = () => {return {type: c.HIGHLIGHT_LOG_IN}}
const signupTry = () => {return {type: c.SIGNUP_TRY}}
const signupSuccess = () => {return {type: c.SIGNUP_SUCCESS}}
const signupFail = () => {return {type: c.SIGNUP_FAIL}}

// **************** MESSAGES ***************

export function showMessage(data) {
  return (dispatch) => {
    dispatch(setMessage(data));
    setTimeout(() => {
      dispatch(nullifyMessage());
    }, 50);
  }
}

const setMessage = (data) => {return {type: c.SET_MESSAGE, data}}
const nullifyMessage = () => {return {type: c.NULLIFY_MESSAGE}}

// *************************** NAVIGATION *************************

export function goBackToScreen(dispatch, key) {
  return new Promise((resolve, reject) => {
    dispatch(NavigationActions.back({key: key}));
    setTimeout(() => {
      resolve();
    }, 500)
  })
}
