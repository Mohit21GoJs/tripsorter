import * as envs from '../env.js';
const apiUrl = envs.APP_API_URL;

const appendApiUrl = url => `${apiUrl}/${url}`;
export function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(appendApiUrl(url), {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      debugger;
      if (response.ok) {
        return response.json();
      }
      // @TODO:  if needed handle http 4xx, 5xx here
      throw new Error('Non successful http code received');
    })
    .catch(console.error);
}

export function getData(url = ``) {
  // Default options are marked with *
  return fetch(appendApiUrl(url), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      debugger;
      console.log('got response', response);
      if (response.ok) {
        return response.json();
      }
      // @TODO:  if needed handle http 4xx, 5xx here
      throw new Error('Non successful http code received');
    })
    .catch(console.error);
}

export default {
  getData,
  postData,
};
