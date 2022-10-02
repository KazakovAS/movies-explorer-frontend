import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import './SavedMovies.css';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <div className="saved-movies__wrapper">
        <SearchForm />
        <MoviesCardList />
      </div>
    </section>
  );
}

export default SavedMovies;
