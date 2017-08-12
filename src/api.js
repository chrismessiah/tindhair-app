import axios from 'axios';
import { API_URL } from './constants';

export function getHairstyles(data) {
  return GET(`hairstyle/list/`, data);
};


export function login(data) {
  return POST(`auth/login/`, data);
};

export function signup(data) {
  return POST(`auth/signup/`, data);
};




export function getUser(data, token) {
  return GET(`user/${data.id}`, {token: token});
};

export function removeUser() {
  return DELETE(`user/`);
};





export function listHairstyles() {
  return GET(`hairstyle/list`);
};

// How to add image upload ????
export function addHairstyle() {
  return POST(`hairstyle/`, {});
};




const GET = (route, params) => {
  return request('GET', route, params);
}

const POST = (route, params) => {
  return request('POST', route, params);
}

const DELETE = (route, params) => {
  return request(axios.delete,route, params);
}

// params is only to be used for passing token or body
const request = (type, route, params) => {
  let config = {
    url: `${API_URL}/${route}`,
    method: type,
  }

  if (params && type != 'GET') {
    config.data = params;
  }

  if (params && params.token) {
    config.headers = {Authorization: `Bearer ${params.token}`};
  }

  return new Promise((resolve, reject) => {
    axios(config)
    .then(response => {
      resolve(handleResponse(response));
    }).catch(err => {
      reject(getErrorMessage(err))
    });
  })
}

const handleResponse = (response) => {
  if (response.status !== 200) {
    console.log(response);
    throw 'Error status is not 200';
  }
  return parseResponse(response)
};

const getErrorMessage = (err) => {
  if (err && err.request && err.request._response) {
    try {
      let error = JSON.parse(err.request._response);
      let errorObject = {code: error.errors[0].status, message: error.errors[0].title};
      console.log(errorObject);
      return errorObject;
    } catch (e) {
      console.log(err);
      console.log(e);
      return {code: '999', message: 'Unknown error, check log'}
    }
  } else { console.log(err); return {code: '999', message: 'Unknown error, check log'}; }
}

const parseResponse = (response, isError) => {
  if (response && response.data) {
    return isError ? response.data.errors : response.data;
  }
  console.log('CANNOT PARSE RESPONSE. HAS NO DATA');
  if (response && response.status) {
    console.log(`STATUS: ${response.status}`);
  }
}
