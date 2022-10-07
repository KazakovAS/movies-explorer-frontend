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
  const [ shortMoviesStatus, setShortMoviesStatus ] = useState(true);

  const [ searchesMovies, setSearchesMovies ] = useState([]);
  const [ filteredShortMovies, setFilteredShortMovies ] = useState([]);

  function handleNotFound(movies) {
    movies.length === 0
      ? setNotFound(true)
      : setNotFound(false)
  }


  function fillShortFilms() {
    const shortMoviesList = filterShortMovies(searchesMovies);

    handleNotFound(shortMoviesList);

    setFilteredShortMovies(shortMoviesList);
    localStorage.setItem('filteredShortMovies', JSON.stringify(filteredShortMovies));
  }

  function fillMoviesList(userRequest) {
    const moviesList = filterMovies(movies, userRequest);

    handleNotFound(moviesList);

    setSearchesMovies(moviesList);
    localStorage.setItem('searchesMovies', JSON.stringify(searchesMovies));

    if (shortMoviesStatus) {
      fillShortFilms();

      setShortMoviesStatus(true);
      localStorage.setItem('shortMoviesStatus', JSON.stringify(shortMoviesStatus));
    } else {
      setShortMoviesStatus(false);
      localStorage.setItem('shortMoviesStatus', JSON.stringify(shortMoviesStatus));
    }
  }

  function handleShortFilms() {
    setShortMoviesStatus(!shortMoviesStatus);
    localStorage.setItem('shortMoviesStatus', JSON.stringify(!shortMoviesStatus));

    if (shortMoviesStatus) fillShortFilms()
  }

  function handleSearchForm(userRequest) {
    setIsProcessing(true);
    setNotFound(false);

    fillMoviesList(userRequest);

    setIsProcessing(false);
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

  // useEffect(() => {
  //   // fillMoviesList();
  // }, [searchesMovies, filteredShortMovies, notFound, handleSearchForm])

  useEffect(() => {
    if (localStorage.getItem('shortMoviesStatus') === 'true') {
      setShortMoviesStatus(true);

      fillShortFilms();
    } else {
      setShortMoviesStatus(false);

      // setSearchesMovies(moviesList);
      localStorage.setItem('searchesMovies', JSON.stringify(searchesMovies));
    }
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
                movies={ shortMoviesStatus ? filteredShortMovies : searchesMovies }
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
