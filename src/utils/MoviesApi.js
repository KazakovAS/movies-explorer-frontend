import Api from './Api.js';
import { MOVIES_API } from './constants';

class MoviesApi extends Api {
  constructor(api) {
    super();

    this._api = api;
  }

  getMovies() {
    return fetch(`${this._api}`)
      .then(res => super._handleError(res))
  }
}

const mainApi = new MoviesApi(MOVIES_API);

export default mainApi;
