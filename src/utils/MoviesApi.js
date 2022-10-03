import Api from "./Api.js";
import { URL_PROTOCOL, MOVIES_DOMAIN } from './constants';

class MoviesApi extends Api {
  constructor(domain) {
    super();

    this._domain = domain;
  }

  getMovies() {
    return fetch(`${URL_PROTOCOL}://${this._domain}/beatfilm-movies`).then(res => super._handleError(res))
  }
}

const mainApi = new MoviesApi(MOVIES_DOMAIN);

export default mainApi;
