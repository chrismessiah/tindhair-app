import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import * as c from '../constants'
import { login, signup, getHairstyles } from '../api/'

// **************** HAIRSTYLES ***************

export function fetchHairstyles(data) {
  return (dispatch) => {
    dispatch(fetchHairstylesTry())
    return getHairstyles(data)
    .then(response => {
      dispatch(fetchHairstylesSuccess(response))
    }).catch(err => {
      dispatch(fetchHairstylesFail())
    })
  }
};

const fetchHairstylesTry = () => {return {type: c.FETCH_HAIRSTYLES_TRY}};
const fetchHairstylesSuccess = (data) => {return {type: c.FETCH_HAIRSTYLES_SUCCESS, data}};
const fetchHairstylesFail = () => {return {type: c.FETCH_HAIRSTYLES_FAIL}};

// **************** LOGIN ***************

export function loginUser(data, backToScreenKey) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'Loader'}));
    dispatch(loginTry())
    return login(data)
    .then(response => {
      dispatch(loginSuccess())
      dispatch(storeAccessToken(response.access_token))
      dispatch(storeRefreshToken(response.refresh_token))
      return AsyncStorage.setItem('refresh_token', response.refresh_token)
    })
    .then(() => {
      dispatch(NavigationActions.navigate({routeName: 'Main'}));
    })
    .catch((err) => {
      dispatch(loginFail());
      goBackToScreen(dispatch, backToScreenKey)
      .then(() => {
        dispatch(showMessage({title: `Error ${err.code}`, message: err.message, type: 'error'}))
      })
    });
  }
}

const loginTry = () => {return {type: c.LOGIN_TRY}};
const loginSuccess = () => {return {type: c.LOGIN_SUCCESS}};
const loginFail = () => {return {type: c.LOGIN_FAIL}};
const storeRefreshToken = (data) => {return {type: c.STORE_REFRESH_TOKEN, data}};
const storeAccessToken = (data) => {return {type: c.STORE_ACCESS_TOKEN, data}};

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
