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

  function handleNotFound(movies) {
    movies.length === 0
      ? setNotFound(true)
      : setNotFound(false)
  }

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);
    localStorage.setItem('shortMoviesStatus', JSON.stringify(!shortMoviesStatus));
  }

  function handleSearchForm(userRequest) {
    // setNotFound(false);

    const filteredMovies = filterMovies(movies, userRequest);
    const result = shortMoviesStatus ? filterShortMovies(filteredMovies) : filteredMovies;

    setMoviesResults(result);
    localStorage.setItem('moviesResults', JSON.stringify(result));
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
    console.log(JSON.parse(movies))
    if (movies) setMoviesResults(JSON.parse(movies));

    if (shortMovies) setShortMoviesStatus(JSON.parse(shortMovies));
  });

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
