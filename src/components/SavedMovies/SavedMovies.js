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

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);
    localStorage.setItem('shortMoviesLikedStatus', JSON.stringify(!shortMoviesStatus));

    handleSetMovies(!shortMoviesStatus, localStorage.getItem('movieSearch'));
  }

  function handleSetMovies(shortMoviesStatus, userRequest) {
    let result;
    const foundMovies = filterMovies(savedMovies, userRequest);
    const foundShortMovie = filterShortMovies(foundMovies);

    setNotFound(false);

    if (foundMovies.length === 0 || (shortMoviesStatus && foundShortMovie.length === 0)) {
      setNotFound(true);

      return;
    }

    result = shortMoviesStatus ? filterShortMovies(foundMovies) : foundMovies;
    setMoviesResults(result);
    localStorage.setItem('moviesLikedResults', JSON.stringify(result));
  }

  function handleSearchForm(userRequest) {
    handleSetMovies(shortMoviesStatus, userRequest);
  }

  useEffect(() => {
    // const movies = localStorage.getItem('moviesLikedResults');
    const shortMovies = localStorage.getItem('shortMoviesLikedStatus');

    setMoviesResults(savedMovies);
    if (shortMovies) setShortMoviesStatus(JSON.parse(shortMovies));
  }, [savedMovies]);

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
              movies={moviesResults}
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
