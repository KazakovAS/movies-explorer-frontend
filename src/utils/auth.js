import Api from "./Api.js";
import { MAIN_DOMAIN } from './constants';

class Auth extends Api {
  constructor(domain) {
    super();

    this._domain = domain;
  }

  register(name, email, password) {
    return fetch(`https://${this._domain}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => this._handleError(res))
  }
  //
  // authorize(email, password) {
  //   return fetch(`https://${this._domain}/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ password, email })
  //   })
  //     .then(res => this._handleError(res))
  //     .then(res => {
  //       if (res.token) {
  //         localStorage.setItem('jwt', res.token);
  //         localStorage.setItem('email', email);
  //         return res;
  //       }
  //     })
  // }
  //
  // checkToken(token) {
  //   return fetch(`https://${this._domain}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(res => this._handleError(res))
  //     .then(res => res)
  // }
}

const auth = new Auth(MAIN_DOMAIN);

export default auth;
