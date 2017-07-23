import {LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAIL} from '../constants'
import { login } from '../api/'

// export function setUserDetails(data) {
//   return {
//     type: FETCHING_DATA,
//     data,
//   }
// }
//
// export function getData() {
//   return {
//     type: FETCHING_DATA
//   }
// }
//
// export function getDataSuccess(data) {
//   return {
//     type: FETCHING_DATA_SUCCESS,
//     data,
//   }
// }
//
// export function getDataFailure() {
//   return {
//     type: FETCHING_DATA_FAILURE
//   }
// }


// *********** MY OWN CODE ***********

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginTry())
    login(email, password)
    .then(data => dispatch(loginSuccess(data)))
    .catch((err) => dispatch(loginFail(err)));
  }
}

export function loginTry() {
  return {
    type: LOGIN_TRY
  }
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    data,
  }
}

export function loginFail(data) {
  return {
    type: LOGIN_FAIL,
    data,
  }
}

// *********** MY OWN CODE ***********




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
