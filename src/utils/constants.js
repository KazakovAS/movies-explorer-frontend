const URL_PROTOCOL = document.location.href.includes('https://') ? 'https' : 'http';
const MAIN_DOMAIN = 'api.lerush.nomoredomains.sbs';
const MAIN_API = `${URL_PROTOCOL}://${MAIN_DOMAIN}`;
const MOVIES_API = 'https://api.nomoreparties.co/beatfilm-movies';

export { MAIN_API, MOVIES_API };
