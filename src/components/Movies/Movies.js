import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import './Movies.css';

function Movies() {
  return (
    <section className="movies">
      <div className="movies__wrapper">
        <SearchForm />
        <MoviesCardList />

        <button className="movies__add-more" type="button">Ещё</button>
      </div>
    </section>
  );
}

export default Movies;
