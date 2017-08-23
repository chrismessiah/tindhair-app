import axios from 'axios';
import { API_URL } from './constants';

export function deleteUser(data) {
  return DELETE(`user/`, data);
};

export function updateGender(data) {
  return POST('user/gender/', data);
}

export function getMyHairstyles(data) {
  return GET(`hairstyle/my/`, data);
};

export function getLikedHairstyles(data) {
  return GET(`like/`, data);
};

export function like(data) {
  return POST(`like/`, data);
};

export function getHairstyles(data) {
  return GET(`hairstyle/list/`, data);
};

export function getAccessTokenFromRefreshToken(data) {
  return POST(`auth/refresh/`, data);
};

export function login(data) {
  return POST(`auth/login/`, data);
};

export function signup(data) {
  return POST(`auth/signup/`, data);
};

export function getMe(data) {
  return GET(`user/myself/`, data);
};

export function postHairstyle(data) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          console.log("FILE UPLOAD ERROR")
          console.log(xhr.statusText);
          console.log(xhr.responseText);
          return reject('FILE UPLOAD ERROR');
        }
        resolve(JSON.parse(xhr.responseText));
      }
    }
    var body = new FormData();
    body.append('file', {
      uri: data.uri,
      type: 'image/jpeg',
      name: 'foobar123'
    });
    body.append('name', data.name);
    body.append('gender', data.gender);
    xhr.open('POST', `${API_URL}/hairstyle/`);
    xhr.setRequestHeader('Authorization', `Bearer ${data.token}`)
    xhr.send(body);
  });
};


// *************************** HTTP REQUEST TYPES ******************************

const GET = (route, params) => {
  return request('GET', route, params);
}

const POST = (route, params) => {
  return request('POST', route, params);
}

const DELETE = (route, params) => {
  return request('DELETE', route, params);
}

// params is only to be used for passing token or body

const request = (type, route, params) => {
  let config = {
    url: `${API_URL}/${route}`,
    method: type,
    headers: {},
  }

  if (params && type === 'POST') {
    config.data = params;
  }

  if (params && params.fileUpload) {
    config.headers = {...config.headers, 'content-type': 'multipart/form-data'};
  }

  if (params && params.token) {
    config.headers = {...config.headers, Authorization: `Bearer ${params.token}`};
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
