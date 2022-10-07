import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const { movies, savedMovies, handleSaveMovie, handleDeleteMovie } = props;

  function getSavedMovieCard(movies, movie) {
    return movies.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  return (
    <>
      { movies.length > 0 &&
        <>
          <ul className="movies-card-list">
            { movies.map(movie =>
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

          <button className="movies__add-more" type="button">Ещё</button>
        </>
      }
    </>
  );
}

export default MoviesCardList;
