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

  const [ movies, setMovies ] = useState([]);
  const [ searchesMovies, setSearchesMovies ] = useState([]);
  const [ shortMovies, setShortMovies ] = useState(false);
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ notFound, setNotFound ] = useState(false);

  function handleSetFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);

    if (moviesList.length === 0) {
      setNotFound(true);
      setIsProcessing(false);
    } else {
      setNotFound(false);
    }

    setSearchesMovies(moviesList);

    setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);

    localStorage.setItem(`moviesFiltered`, JSON.stringify(moviesList));
  }

  function handleSearchForm(userRequest) {
    setIsProcessing(true);

    localStorage.setItem(`movieSearch`, userRequest);
    // localStorage.setItem(`shortMoviesSearch`, shortMovies);

    moviesApi.getMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        setMovies(res);
      })
      .catch((err) => {
        setServerResponse({ status: 'error', message: err.message});
      })
      .finally(() => {
        setIsProcessing(false);
      });

    handleSetFilteredMovies(movies, userRequest, shortMovies);
  }

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

          { notFound
            ? <NoResults />
            : <MoviesCardList
                movies={filteredMovies}
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
