import { useState, useEffect } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import { CARDS_PARAMS } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const { movies, savedMovies, handleSaveMovie, handleDeleteMovie } = props;

  const screenWidth = useScreenWidth();
  const { tablet, mobile } = CARDS_PARAMS;
  const [ amountCards, setAmountCards ] = useState({ default: mobile.total, add: mobile.add });
  const [ isMount, setIsMount ] = useState(true);
  const [ shownMovies, setShownMovies ] = useState([]);

  function getSavedMovieCard(movies, movie) {
    return movies.find(item => item.movieId === (movie.id || movie.movieId));
  }

  function handleAddMovies() {
    const start = shownMovies.length;
    const end = start + amountCards.add;
    const additional = movies.length - start;

    if (additional > 0) {
      const newCards = movies.slice(start, end);

      setShownMovies([...shownMovies, ...newCards]);
    }
  }

  useEffect(() => {
    screenWidth >= tablet.width
      ? setAmountCards(tablet.cards)
      : setAmountCards(mobile.cards);

    return () => setIsMount(false);
  }, [screenWidth, isMount, tablet, mobile]);

  useEffect(() => {
    if (movies.length) {
      let defaultCards;

      location.pathname === '/movies'
       ? defaultCards = movies.filter((item, i) => i < amountCards.total)
       : defaultCards = movies;

      setShownMovies(defaultCards);
    }
  }, [movies, amountCards.total]);

  return (
    <>
      { shownMovies.length > 0 &&
        <>
          <ul className="movies-card-list">
            { shownMovies.map(movie =>
              <li
                className="movies-card-list__item"
                key={movie._id || movie.id}
              >
                <MoviesCard
                  movie={movie}
                  saved={getSavedMovieCard(savedMovies, movie)}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />
              </li>
            )}
          </ul>

          { location.pathname === '/movies' && shownMovies.length !== movies.length &&
            <button
              className="movies__add-more"
              type="button"
              onClick={handleAddMovies}
            >
              Ещё
            </button>
          }
        </>
      }
    </>
  );
}

export default MoviesCardList;
