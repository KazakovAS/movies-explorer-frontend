import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>

        <div className="footer__info">
          <div className="footer__links">
            <a href="https://practicum.yandex.ru/" className="footer__links-item" target="_blank" rel="nofollow noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/KazakovAS" className="footer__links-item" target="_blank" rel="nofollow noreferrer">Github</a>
          </div>
          <p className="footer__copy">&copy; 2020</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
