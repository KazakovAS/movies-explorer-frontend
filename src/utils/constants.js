// const URL_PROTOCOL = document.location.href.includes('https://') ? 'https' : 'http';
const URL_PROTOCOL = 'http';
// const MAIN_DOMAIN = 'api.lerush.nomoredomains.sbs';
const MAIN_DOMAIN = 'localhost:3000';
const MAIN_API = `${URL_PROTOCOL}://${MAIN_DOMAIN}`;

const MOVIES_DOMAIN = 'api.nomoreparties.co';
const MOVIES_API = `https://${MOVIES_DOMAIN}/beatfilm-movies`;
const MOVIES_IMAGES = `https://${MOVIES_DOMAIN}`;

export { MAIN_API, MOVIES_API, MOVIES_IMAGES };
