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
  const [ moviesLikedLastResults, setMoviesLikedLastResults ] = useState(savedMovies);
  const [ foundMoviesLiked, setFoundMoviesLiked ] = useState([]);
  const [ foundShortMoviesLiked, setFoundShortMoviesLiked ] = useState([]);

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);

    const Temp = !shortMoviesStatus;

    selectMoviesForFill(foundMoviesLiked, foundShortMoviesLiked, Temp);
  }

  function selectMoviesForFill(foundShortMoviesLiked, shortMoviesLiked, shortMoviesStatus ) {
    const defaultLikedSearch = localStorage.getItem('defaultLikedSearch');

    if (defaultLikedSearch === 'true') {
      if (shortMoviesStatus) {
        fillMovies(filterShortMovies(savedMovies));
      } else {
        fillMovies(savedMovies);
      }

      return;
    }

    if (shortMoviesStatus) {
      fillMovies(shortMoviesLiked);
    } else {
      fillMovies(foundShortMoviesLiked);
    }
  }

  function fillMovies(movies) {
    if (movies.length === 0) {
      setNotFound(true);
      setMoviesLikedLastResults([]);
    } else {
      setNotFound(false);
      setMoviesLikedLastResults(movies);
    }
  }

  function handleFindShortMovies(movies) {
    return filterShortMovies(movies);
  }

  function handleFindMovies(movies, userRequest) {
    return filterMovies(movies, userRequest);
  }

  function handleSetMovies(movies, userRequest) {
    setNotFound(false);
    const foundMoviesLiked = handleFindMovies(movies, userRequest);
    const foundShortMoviesLiked = handleFindShortMovies(foundMoviesLiked);

    setFoundMoviesLiked(foundMoviesLiked)
    setFoundShortMoviesLiked(foundShortMoviesLiked)

    selectMoviesForFill(foundMoviesLiked, foundShortMoviesLiked, shortMoviesStatus);
  }

  function handleSearchForm(userRequest) {
    localStorage.setItem('defaultLikedSearch', JSON.stringify(false));
    handleSetMovies(savedMovies, userRequest);
  }

  useEffect(() => {
    setMoviesLikedLastResults(savedMovies);
    localStorage.setItem('defaultLikedSearch', JSON.stringify(true));
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

          { notFound || moviesLikedLastResults.length === 0 && !savedMovies
            ? <NoResults />
            : <MoviesCardList
              movies={moviesLikedLastResults}
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
