import { SHORT_MOVIES_DURATION } from './constants.js';

function convertingTime(time, format = 'en') {
  const hours = Math.trunc(time/60);
  const minutes = time % 60;
  const hoursUnit = format === 'en' ? 'h' : 'ч';
  const minutesUnit = format === 'en' ? 'm' : 'м';

  return hours > 0
    ? (`${hours}${hoursUnit} ${minutes}${minutesUnit}`)
    : (`${minutes}${minutesUnit}`);
}

function filterMovies(movies, userRequest) {
  return movies.filter(movie => {
    const userMovie = userRequest.toLowerCase().trim();

    return movie
        .nameRU
        .toLowerCase()
        .trim()
        .indexOf(userMovie) !== -1
      || movie
        .nameEN
        .toLowerCase()
        .trim()
        .indexOf(userMovie) !== -1;
  });
}

function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration <= SHORT_MOVIES_DURATION);
}

const normalizeData = (data) => {
  const checker = {
    country: { check: (country) => String, defaultValue: ''},
    created_at: { check: (created_at) => String, defaultValue: ''},
    description: { check: (description) => String, defaultValue: ''},
    director: { check: (director) => String, defaultValue: ''},
    duration: { check: (duration) => Number, defaultValue: ''},
    id: { check: (id) => Number, defaultValue: ''},
    image: { check: (image) => Object, defaultValue: { url: 'https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=681&h=383&crop=1' }},
    nameEN: { check: (nameEN) => { return Boolean(nameEN) }, defaultValue: ''},
    nameRU: { check: (nameRU) => String, defaultValue: ''},
    trailerLink: { check: (trailerLink) => String, defaultValue: ''},
    updated_at: { check: (updated_at) => String, defaultValue: ''},
    year: { check: (year) => String, defaultValue: ''},
    thumbnail: { check: (image) => Object, defaultValue: null},
  };

  const obj = {};

  const normalizedData = Object.entries(data).map(([key, value]) => {
    if (key === 'nameEN' && !value.match(/^[-?!,&*:—.A-Za-z0-9\\s]+$/)) {
      value = 'null';
    }

    if (key === 'trailerLink' && !value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) {
      value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }

    obj[key] = value;
  });

  console.log(obj)

  return obj;
}

export { convertingTime, filterMovies, normalizeData, filterShortMovies };
