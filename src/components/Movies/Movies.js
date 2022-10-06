import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import './Movies.css';

function Movies(props) {
  const { movies, handleSearchForm, isProcessing, serverResponse } = props;

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <SearchForm
          handleSearchForm={handleSearchForm}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
        <>
          { isProcessing && <Preloader /> }
          <MoviesCardList
            movies={movies}
          />
        </>
      </div>
    </section>
  );
}

export default Movies;
