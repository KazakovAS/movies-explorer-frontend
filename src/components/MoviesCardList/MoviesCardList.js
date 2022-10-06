import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const { movies } = props;

  return (
    <>
      { movies.length > 0 &&
        <>
          <ul className="movies-card-list">
            { movies.map(movie =>
              <li
                className="movies-card-list__item"
                // key={ saved ? movie._id : movie.id }
              >
                <MoviesCard
                  movie={movie}
                  // saved={saved}
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
