import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

import { filterMovies, filterShortMovies } from '../../utils/helpers';
import moviesApi from "../../utils/MoviesApi";

import './Movies.css';

function Movies(props) {
  const { savedMovies, handleSaveMovie, handleDeleteMovie, isProcessing, setIsProcessing, setServerResponse, serverResponse } = props;

  const [ movies, setMovies ] = useState(JSON.parse(localStorage.getItem('movies')));
  const [ notFound, setNotFound ] = useState(false);
  const [ shortMoviesStatus, setShortMoviesStatus ] = useState(false);

  const [ moviesResults, setMoviesResults ] = useState([]);
  const [ df, setDf ] = useState([]);

  function handleNotFound(movies) {
    movies.length === 0
      ? setNotFound(true)
      : setNotFound(false);
  }

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);
    localStorage.setItem('shortMoviesStatus', JSON.stringify(!shortMoviesStatus));

    handleSetMovies(!shortMoviesStatus, localStorage.getItem('movieSearch'))
  }

  function handleSetMovies(shortMoviesStatus, userRequest) {
    const foundMovies = filterMovies(movies, userRequest);

    if (!handleNotFound(foundMovies)) {
      setDf(foundMovies);
    }

    setMoviesResults(
      shortMoviesStatus
        ? filterShortMovies(foundMovies)
        : foundMovies
    );
  }

  function handleSearchForm(userRequest) {
    // setNotFound(false);

    handleSetMovies(userRequest, userRequest);

    // setMoviesResults(result);
    // localStorage.setItem('moviesResults', JSON.stringify(result));
  }

  useEffect(() => {
    if (!localStorage.getItem('movies')) {
      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem('movies', JSON.stringify(res));
        })
        .catch((err) => {
          setServerResponse({ status: 'error', message: err.message});
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  }, [movies]);

  useEffect(() => {
    const movies = localStorage.getItem('moviesResults');
    const shortMovies = localStorage.getItem('shortMoviesStatus');

    if (movies) setMoviesResults(JSON.parse(movies));
    if (shortMovies) setShortMoviesStatus(JSON.parse(shortMovies));
  }, []);

  return (
    <section className="movies">
      <div className="movies__wrapper">
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
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
          }
        </>
      </div>
    </section>
  );
}

export default Movies;
