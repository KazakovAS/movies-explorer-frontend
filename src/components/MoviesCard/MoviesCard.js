import './MoviesCard.css';
import preview from '../../images/movie-card.jpg';

function MoviesCard() {
  return (
    <article className="movies-card">
      <picture className="movies-card__preview">
        <img className="movies-card__preview-image" src={preview} alt="Фотограф на фоне машин" />
      </picture>

      <div className="movies-card__content">
        <div className="movies-card__description">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <time className="movies-card__duration" dateTime="1h 42m">1ч 42м</time>
        </div>

        {/*<button className="movies-card__button movies-card__button_type_default" type="button" />*/}
        <button className="movies-card__button movies-card__button_type_liked" type="button" />
        {/*<button className="movies-card__button movies-card__button_type_delete" type="button" />*/}
      </div>
    </article>
  );
}

export default MoviesCard;
