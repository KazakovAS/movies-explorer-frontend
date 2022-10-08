import {useEffect, useState} from 'react';

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
  const [ moviesLastResults, setMoviesLastResults ] = useState([]);

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);
    localStorage.setItem('shortMoviesStatus', JSON.stringify(!shortMoviesStatus));

    selectMoviesForFill();
  }

  function handleFindShortMovies(movies) {
    const shortMovies = filterShortMovies(movies);

    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  }

  function handleFindMovies(movies, userRequest) {
    const foundMovies = filterMovies(movies, userRequest);

    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
  }

  function handleSetMovies(movies, userRequest) {
    setNotFound(false);

    handleFindMovies(movies, userRequest);
    handleFindShortMovies(JSON.parse(localStorage.getItem('foundMovies')));

    selectMoviesForFill();
  }

  function selectMoviesForFill() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));
    const shortMoviesStatus = JSON.parse(localStorage.getItem('shortMoviesStatus'));

    if (foundMovies && shortMovies) {
      if (shortMoviesStatus) {
        fillMovies(shortMovies);
      } else {
        console.log(foundMovies);
        fillMovies(foundMovies);
      }
    }
  }

  function fillMovies(movies) {
    if (movies.length === 0) {
      setNotFound(true);
      setMoviesLastResults([]);
      localStorage.setItem('moviesLastResults', JSON.stringify([]));
    } else {
      setNotFound(false);
      setMoviesLastResults(movies);
      localStorage.setItem('moviesLastResults', JSON.stringify(movies));
    }
  }

  function handleSearchForm(userRequest) {
    localStorage.setItem('shortMoviesStatus', JSON.stringify(shortMoviesStatus));

    if (!localStorage.getItem('movies')) {
      setIsProcessing(true);

      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem('movies', JSON.stringify(res));

          handleSetMovies(res, userRequest);
        })
        .catch((err) => {
          setServerResponse({ status: 'error', message: err.message});
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }

    handleSetMovies(movies, userRequest);
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

          { notFound || moviesLastResults.length === 0 && JSON.parse(localStorage.getItem('movies'))
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
