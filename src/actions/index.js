import { NavigationActions } from 'react-navigation';
import { AsyncStorage, Platform } from 'react-native';

import * as c from '../constants'
import {
  login,
  signup,
  getMe,
  getHairstyles,
  getAccessTokenFromRefreshToken,
  like,
  getLikedHairstyles,
  postHairstyle,
  getMyHairstyles,
  deleteUser,
  updateGender,
} from '../api/'

// **************** HAIRSTYLES ***************
export function sendHairstyle(data) {
  return (dispatch) => {
    dispatch(sendHairstyleTry())
    return postHairstyle(data)
    .then(response => {
      dispatch(sendHairstyleSuccess(response))
      dispatch(NavigationActions.back())
      setTimeout(() => {dispatch(navigateTo('Search'))}, 500);
      if (Platform.os === 'ios') RNFS.unlink(data.uri);
    }).catch(err => {
      console.log(err);
      dispatch(sendHairstyleFail())
    })
  }
}

const sendHairstyleSuccess = (data) => {return {type: c.SEND_HAIRSTYLE_SUCCESS, data}};
const sendHairstyleTry = () => {return {type: c.SEND_HAIRSTYLE_TRY}};
const sendHairstyleFail = () => {return {type: c.SEND_HAIRSTYLE_FAIL}}



export function fetchMyHairstyles(data) {
  return (dispatch) => {
    dispatch(fetchMyHairstylesTry())
    return getMyHairstyles(data)
    .then(response => {
      dispatch(fetchMyHairstylesSuccess(response))
    }).catch(err => {
      console.log(err);
      dispatch(fetchMyHairstylesFail())
    })
  }
}
const fetchMyHairstylesSuccess = (data) => {return {type: c.FETCH_MY_HAIRSTYLES_SUCCESS, data}};
const fetchMyHairstylesTry = () => {return {type: c.FETCH_MY_HAIRSTYLES_TRY}};
const fetchMyHairstylesFail = () => {return {type: c.FETCH_MY_HAIRSTYLES_FAIL}}


export function fetchLikedHairstyles(data) {
  return (dispatch) => {
    dispatch(fetchLikedHairstylesTry())
    return getLikedHairstyles(data)
    .then(response => {
      dispatch(fetchLikedHairstylesSuccess(response))
    }).catch(err => {
      console.log(err);
      dispatch(fetchLikedHairstylesFail())
    })
  }
}

const fetchLikedHairstylesSuccess = (data) => {return {type: c.FETCH_LIKED_HAIRSTYLES_SUCCESS, data}};
const fetchLikedHairstylesTry = () => {return {type: c.FETCH_LIKED_HAIRSTYLES_TRY}};
const fetchLikedHairstylesFail = () => {return {type: c.FETCH_LIKED_HAIRSTYLES_FAIL}};

export function likeHairstyle(data) {
  return (dispatch) => {
    dispatch(likeTry())
    return like(data)
    .then(response => {
      dispatch(likeSuccess(data))
    }).catch(err => {
      console.log(err);
      dispatch(likeFail())
    })
  }
}

const likeTry = () => {return {type: c.LIKE_TRY}};
const likeFail = () => {return {type: c.LIKE_FAIL}};
const likeSuccess = (data) => {return {type: c.LIKE_SUCCESS, data}};

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

// **************** LOGOUT **************

export function logout(firstScreenKey) {
  return (dispatch) => {
    return AsyncStorage.clear()
    .then(() => {
      dispatch(clearTokens())
      dispatch(clearStore())
      return goBackToScreen(dispatch, firstScreenKey)
    }).then(() => {

    }).catch(err => {
      console.log(err);
      if (firstScreenKey) goBackToScreen(dispatch, firstScreenKey);
    })
  }
}
const clearStore = () => {return {type: c.CLEAR_STORE}};
const clearTokens = () => {return {type: c.CLEAR_TOKENS}};

// **************** CHANGE GENDER ***************
export function changeGender(data) {
  return (dispatch) => {
    dispatch(changeGenderTry())
    return updateGender(data)
    .then(response => {
      dispatch(changeGenderSuccess(data));
      dispatch(fetchHairstyles(data))
    }).catch(err => {
      console.log(err);
      dispatch(changeGenderFail());
    })
  }
}

const changeGenderTry = () => {return {type: c.CHANGE_GENDER_TRY}};
const changeGenderSuccess = (data) => {return {type: c.CHANGE_GENDER_SUCCESS, data}};
const changeGenderFail = () => {return {type: c.CHANGE_GENDER_FAIL}};

// **************** DELETE ACCOUNT ***************
export function deleteAccount(data, firstScreenKey) {
  return (dispatch) => {
    dispatch(deleteAccountTry())
    deleteUser(data)
    .then(response => {
      dispatch(deleteAccountSuccess())
      dispatch(logout(firstScreenKey))
    }).catch(err => {
      dispatch(deleteAccountFail())
      console.log(err);
    })
  }
}

const deleteAccountTry = () => {return {type: c.DELETE_ACCOUNT_TRY}};
const deleteAccountSuccess = () => {return {type: c.DELETE_ACCOUNT_SUCCESS}};
const deleteAccountFail = () => {return {type: c.DELETE_ACCOUNT_FAIL}};

// **************** LOGIN ***************
export function checkIfLoggedIn(data, backToScreenKey) {
  return (dispatch) => {
    return AsyncStorage.getItem('refresh_token')
    .then(refreshToken => {
      if (!refreshToken) throw 'Not logged in';
      dispatch(storeRefreshToken(refreshToken))
      return getAccessTokenFromRefreshToken({refresh_token: refreshToken})
    }).then(response => {
      dispatch(storeAccessToken(response.access_token))
      return getMe({token: response.access_token})
    }).then(response => {
      dispatch(storeMe(response));
      dispatch(navigateTo('Main'));
    }).catch(err => {
      dispatch(navigateTo('LoginSelection'));
    })
  }
}

export function loginUser(data, backToScreenKey) {
  let accessToken;
  return (dispatch) => {
    dispatch(navigateTo('Loader'));
    dispatch(loginTry())
    return login(data)
    .then(response => {
      accessToken = response.access_token;
      dispatch(loginSuccess())
      dispatch(storeAccessToken(response.access_token))
      dispatch(storeRefreshToken(response.refresh_token))
      return AsyncStorage.setItem('refresh_token', response.refresh_token)
    }).then(() => {
      return getMe({token: accessToken})
    }).then((response) => {
      dispatch(storeMe(response));
      dispatch(navigateTo('Main'));
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

const storeMe = (data) => {return {type: c.STORE_ME, data}};
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
    dispatch(navigateTo('PostAuth'));
    signup({email: email, password: password, gender: gender, fullname: fullname})
    .then(data => {
      dispatch(signupSuccess());
      return goBackToScreen(dispatch, backToScreenKey)
    }).then(() => {
      dispatch(highlightLogIn());
      const message = (email.indexOf('@kth.se') === -1) ? 'Please check your mail to verify your account' : 'Account verified (KTH). Please sign in.';
      dispatch(showMessage({title: 'Success', message: message, type: 'success'}))
    }).catch((err) => {
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

const navigateTo = (route) => {return NavigationActions.navigate({routeName: route})}
