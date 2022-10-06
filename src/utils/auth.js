import Api from './Api.js';
import { MAIN_API } from './constants';

class Auth extends Api {
  constructor(api) {
    super();

    this._api = api;
  }

  register(name, email, password) {
    return fetch(`${this._api}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => super._handleError(res))
  }

  authorize(email, password) {
    return fetch(`${this._api}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => super._handleError(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);

          return res;
        }
      })
  }

  checkToken() {
    return fetch(`${this._api}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => super._handleError(res))
      .then(res => res)
  }
}

const auth = new Auth(MAIN_API);

export default auth;
