import { MOVIES_IMAGES } from '../../utils/constants';
import { convertingTime } from '../../utils/helpers';

import './MoviesCard.css';

function MoviesCard(props) {
  const { movie, saved } = props;
  const { nameRU, image, duration, liked, trailerLink, owner } = movie;
  console.log(movie)

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
              {nameRU}
            </a>
          </h2>
          <time className="movies-card__duration" dateTime={convertingTime(duration, 'en')}>{convertingTime(duration, 'ru')}</time>
        </div>

        {/*<button className="movies-card__button movies-card__button_type_default" type="button" />*/}
        <button className="movies-card__button movies-card__button_type_liked" type="button" />
        {/*<button className="movies-card__button movies-card__button_type_delete" type="button" />*/}
      </div>
    </article>
  );
}

export default MoviesCard;
