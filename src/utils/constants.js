// const URL_PROTOCOL = document.location.href.includes('https://') ? 'https' : 'http';
const URL_PROTOCOL = 'http';
const MAIN_DOMAIN = 'api.lerush.nomoredomains.sbs';
// const MAIN_DOMAIN = 'localhost:3000';
const MAIN_API = `${URL_PROTOCOL}://${MAIN_DOMAIN}`;

const MOVIES_DOMAIN = 'api.nomoreparties.co';
const MOVIES_API = `https://${MOVIES_DOMAIN}/beatfilm-movies`;
const MOVIES_IMAGES = `https://${MOVIES_DOMAIN}`;

const CARDS_PARAMS = {
  tablet: {
    width: 768,
    cards: {
      total: 7,
      add: 7,
    },
  },
  mobile: {
    cards: {
      total: 5,
      add: 5,
    },
  },
};

const SHORT_MOVIES_DURATION = 40;

export { MAIN_API, MOVIES_API, MOVIES_IMAGES, CARDS_PARAMS, SHORT_MOVIES_DURATION };
