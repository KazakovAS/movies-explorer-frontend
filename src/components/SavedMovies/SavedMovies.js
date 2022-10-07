import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

import { filterMovies, filterShortMovies } from '../../utils/helpers';
import './SavedMovies.css';

function SavedMovies(props) {
  const { savedMovies, handleDeleteMovie, isProcessing, serverResponse } = props;

  const [ notFound, setNotFound ] = useState(false);
  const [ shortMoviesStatus, setShortMoviesStatus ] = useState(false);
  const [ moviesResults, setMoviesResults ] = useState([]);



  return (
    <section className="saved-movies">
      <div className="saved-movies__wrapper">
        <SearchForm
          handleSearchForm={handleSearchForm}
          handleShortFilms={handleShortFilms}
          shortMoviesStatus={shortMoviesStatus}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
        <>
          { isProcessing && <Preloader /> }

          { notFound
            ? <NoResults />
            : <MoviesCardList
              movies={ shortMoviesStatus ? filteredShortMovies : searchesMovies }
              savedMovies={savedMovies}
              handleDeleteMovie={handleDeleteMovie}
            />
          }
        </>
      </div>
    </section>
  );
}

export default SavedMovies;
