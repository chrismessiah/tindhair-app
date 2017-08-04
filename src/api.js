import axios from 'axios';
import { API_URL } from './constants';




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




const GET = (route) => {
  return request('GET', route);
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

  if (params) {
    config.data = params;
  }

  if (params && params.token) {
    config.headers = {Authorization: `Bearer ${params.token}`};
  }

  return new Promise((resolve, reject) => {
    axios(config)
    .then(response => {
      console.log(response);
      resolve(parseResponse(response));
    }).catch(err => {
      printError(err);
      reject(err)
    });
  })
}

const printError = (err) => {
  let parsedError = parseResponse(err, true);
  if (parsedError) {
    for (var i = 0; i < parsedError.length; i++) {
      console.log(`ERROR: ${parsedError[i].status} - ${parsedError[i].title} `);
    }
  } else {
    console.log(err);
  }
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
