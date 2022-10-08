import {useEffect, useState} from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

import {filterMovies, filterShortMovies} from '../../utils/helpers';
import moviesApi from "../../utils/MoviesApi";

import './Movies.css';

function Movies(props) {
  const { savedMovies, handleSaveMovie, handleDeleteMovie, isProcessing, setIsProcessing, setServerResponse, serverResponse } = props;

  const [ movies, setMovies ] = useState(JSON.parse(localStorage.getItem('movies')));
  const [ notFound, setNotFound ] = useState(false);
  const [ shortMoviesStatus, setShortMoviesStatus ] = useState(false);
  const [ moviesLastResults, setMoviesLastResults ] = useState([]);

  function handleShortFilms() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));

    localStorage.setItem('shortMoviesStatus', JSON.stringify(!shortMoviesStatus));
    setShortMoviesStatus(!shortMoviesStatus);

    if (foundMovies && shortMovies) {
      if (!shortMoviesStatus) {
        shortMovies.length === 0
          ? setNotFound(true)
          : setMoviesLastResults(shortMovies);
      } else {
        foundMovies.length === 0
          ? setNotFound(true)
          : setMoviesLastResults(foundMovies);
      }
    }
  }

  function handleFindShortMovies(movies) {
    const shortMovies = filterShortMovies(movies);

    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
    localStorage.setItem('moviesLastResults', JSON.stringify(shortMovies));
  }

  function handleFindMovies(movies, userRequest) {
    const foundMovies = filterMovies(movies, userRequest);

    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('moviesLastResults', JSON.stringify(foundMovies));
  }

  function handleSetMovies(movies, shortMoviesStatus, userRequest) {
    setNotFound(false);

    handleFindMovies(movies, userRequest);
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

    handleFindShortMovies(foundMovies);
    const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));

    if (!shortMoviesStatus) {
      foundMovies.length === 0
        ? setNotFound(true)
        : setMoviesLastResults(foundMovies);
    } else {
      shortMovies.length === 0
        ? setNotFound(true)
        : setMoviesLastResults(shortMovies);
    }
  }

  function handleSearchForm(userRequest) {
    if (!localStorage.getItem('movies')) {
      setIsProcessing(true);

      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem('movies', JSON.stringify(res));

          handleSetMovies(res, shortMoviesStatus, userRequest);
        })
        .catch((err) => {
          setServerResponse({ status: 'error', message: err.message});
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }

    handleSetMovies(movies, shortMoviesStatus, userRequest);
  }

  useEffect(() => {
    const movies = localStorage.getItem('moviesLastResults');
    const shortMovies = localStorage.getItem('shortMoviesStatus');

    if (movies) setMoviesLastResults(JSON.parse(movies));
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
                movies={moviesLastResults}
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
