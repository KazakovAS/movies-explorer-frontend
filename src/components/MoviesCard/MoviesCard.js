import { MOVIES_IMAGES } from '../../utils/constants';
import { convertingTime } from '../../utils/helpers';

import './MoviesCard.css';

function MoviesCard(props) {
  const { movie, saved, handleSaveMovie, handleDeleteMovie } = props;
  const { nameRU, image, duration, trailerLink, owner } = movie;

  function onLike() {
    handleSaveMovie(movie);
  }

  function onDelete() {
    handleDeleteMovie(movie);
  }

  return (
    <article className="movies-card">
      <picture className="movies-card__preview">
        <img className="movies-card__preview-image" src={`${MOVIES_IMAGES}${image.url}`} alt={nameRU} />
      </picture>

      <div className="movies-card__content">
        <div className="movies-card__description">
          <h2 className="movies-card__title">
            <a
              href={`${trailerLink}`}
              className="movies-card__link"
              target="_blank"
              rel="nofollow noreferrer"
            >
              { nameRU }
            </a>
          </h2>
          <time className="movies-card__duration" dateTime={convertingTime(duration, 'en')}>{convertingTime(duration, 'ru')}</time>
        </div>

        {location.pathname === '/movies' && (
          <button
            className={`movies-card__button movies-card__button_type_${
              saved ? 'liked' : 'default'
            }`}
            aria-label={`${
              saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
            }`}
            type="button"
            onClick={saved ? onDelete : onLike}
          />
        )}

        {location.pathname === '/saved-movies' && (
          <button
            className="movies-card__button movies-card__button_type_delete"
            aria-label="Удалить фильм"
            type="button"
            onClick={onDelete}
          />
        )}
      </div>
    </article>
  );
}

export default MoviesCard;
