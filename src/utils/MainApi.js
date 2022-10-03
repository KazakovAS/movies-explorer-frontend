import Api from "./Api.js";
import { MAIN_DOMAIN } from './constants';

class MainApi extends Api {
  constructor(domain) {
    super();

    this._domain = domain;
  }

  // getProfile(token) {
  //   return fetch(`https://${this._domain}/users/me`, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     }
  //   })
  //     .then(res => this._handleError(res))
  // }

//   getInitialCards(token) {
//     return fetch(`https://${this._domain}/cards`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => this._handleError(res))
//   }

  // editProfile(name, email, token) {
  //   return fetch(`https://${this._domain}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ name, email })
  //   })
  //     .then(res => this._handleError(res))
  // }

//   addCard(name, link, token) {
//     return fetch(`https://${this._domain}/cards`, {
//       method: "POST",
//       headers: {
//         authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name, link })
//     })
//       .then(res => this._handleError(res))
//   }

//   deleteCard(id, token) {
//     return fetch(`https://${this._domain}/cards/${id}`, {
//       method: "DELETE",
//       headers: {
//         authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => this._handleError(res))
//   }

//   addLike(id, token) {
//     return fetch(`https://${this._domain}/cards/${id}/likes`, {
//       method: "PUT",
//       headers: {
//         authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => this._handleError(res))
//   }

//   deleteLike(id, token) {
//     return fetch(`https://${this._domain}/cards/${id}/likes`, {
//       method: "DELETE",
//       headers: {
//         authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => this._handleError(res))
//   }
}

const mainApi = new MainApi(MAIN_DOMAIN);

export default mainApi;
