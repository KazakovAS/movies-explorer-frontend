import {MOVIES_IMAGES, SHORT_MOVIES_DURATION} from './constants.js';

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
    nameEN: { check: (nameEN) => /^[-?!,&*:—.A-Za-z0-9\\s]+$/, defaultValue: 'h'},
    nameRU: { check: (nameRU) => String, defaultValue: ''},
    trailerLink: { check: (trailerLink) => /^\//.test(value), defaultValue: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'},
    updated_at: { check: (updated_at) => String, defaultValue: ''},
    year: { check: (year) => String, defaultValue: ''},
    thumbnail: { check: (image) => Object, defaultValue: null},
  };

  const normalizedData = Object.entries(data).map(([key, value]) => {
    if (checker[key].check(value)) {
      console.log(value)
      return value;
    }

    return defaultValue;
  });

  let newObj = {};
  const ObjKeys = Object.keys(checker);

  for (let i = 0; i < ObjKeys.length; i++) {
    newObj[ObjKeys[i]] = normalizedData[i];
  }

  console.log(newObj)
  return newObj;
}

// const normalizeData = (data) => {
//   const checker = {
//     nameRU: { check: (name) => Boolean, defaultValue: ''},
//   };
//
//   const normalizedData = Object.entries(data).map(([key, value]) => {
//     if (checker[key].check(value)) {
//       return value;
//     }
//
//     return defaultValue;
//   })
// }

export { convertingTime, filterMovies, normalizeData, filterShortMovies };
