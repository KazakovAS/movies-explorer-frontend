import Api from './Api.js';
import { MOVIES_IMAGES, MAIN_API } from './constants';

class MainApi extends Api {
  constructor(api) {
    super();

    this._api = api;
  }

  getProfile() {
    return fetch(`${this._api}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(res => super._handleError(res))
  }

  editProfile(name, email) {
    return fetch(`${this._api}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
      .then(res => super._handleError(res))
  }

  getSavedMovies() {
    return fetch(`${this._api}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(res => super._handleError(res))
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id
  }) {
    return fetch(`${this._api}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `${MOVIES_IMAGES}${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `${MOVIES_IMAGES}${image?.formats?.thumbnail?.url}`,
        movieId: Number(id),
      })
    })
      .then(res => super._handleError(res))
  }

  deleteMovie(id) {
    return fetch(`${this._api}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => super._handleError(res))
  }
}

const mainApi = new MainApi(MAIN_API);

export default mainApi;
