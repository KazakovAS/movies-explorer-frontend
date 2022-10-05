import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import './Movies.css';

function Movies(props) {
  const { handleSearchFormSubmit, isProcessing, serverResponse } = props;

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <SearchForm
          handleSearchFormSubmit={handleSearchFormSubmit}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />

        <>
          { isProcessing && <Preloader /> }
          <MoviesCardList />

          <button className="movies__add-more" type="button">Ещё</button>
        </>
      </div>
    </section>
  );
}

export default Movies;
