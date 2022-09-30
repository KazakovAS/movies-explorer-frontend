import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <ul className="movies-card-list">
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
      <li className="movies-card-list__item">
        <MoviesCard />
      </li>
    </ul>
  );
}

export default MoviesCardList;
