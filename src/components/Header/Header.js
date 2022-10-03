import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";
import Account from "../Account/Account";
import { AuthContext } from "../../contexts/AuthContext";

import './Header.css';

function Header(props) {
  const { theme } = props;

  const [ isMenuOpen, setMenuOpen ] = useState(false);
  // const loggedIn = useContext(AuthContext);
  const loggedIn = false;

  function openMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const menu = (
    <>
      <div className="menu">
        <div className="menu__content">
          <button
            className="menu__button menu__button_close"
            onClick={openMenu}
            type="button"
          >
            <svg
              className="menu__button-icon"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="7.16016" y="9.28249" width="3" height="22" transform="rotate(-45 7.16016 9.28249)" fill="black"/>
              <rect x="22.7168" y="7.16117" width="3" height="22" transform="rotate(45 22.7168 7.16117)" fill="black"/>
            </svg>
          </button>

          <Navigation />
        </div>
      </div>
    </>
  );

  const headerLoggedIn = (
    <>
      <nav className={`navigation header-navigation ${ theme === 'blue' ? 'header-navigation_theme_dark' : ''}`}>
        <ul className="navigation__list header-navigation__list">
          <li className="navigation__item header-navigation__item header-navigation__item_type_accent">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__item header-navigation__item">
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <Account className="header__account" />
      </nav>

      <button
        className="header__menu-button header__menu-button_open"
        onClick={openMenu}
        type="button"
      >
        <svg
          className={`header__menu-button-icon ${ theme === 'blue' ? 'header__menu-button-icon_theme_dark' : ''}`}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          aria-hidden="true"
          focusable="false"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M36 14L8 14V11L36 11V14Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M36 24L8 24V21L36 21V24Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M36 34L8 34V31L36 31V34Z" />
        </svg>
      </button>

      {isMenuOpen && menu}
    </>
  );

  const headerNotLogged = (
    <div className="header__auth">
      <Link to="/signup" className={`header__auth-link ${ theme === 'blue' ? 'header__auth-link_theme_dark' : ''}`}>
        Регистрация
      </Link>
      <Link to="/signin" className="header__auth-link header__auth-link_type_button">
        Войти
      </Link>
    </div>
  );

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <Link className="header__logo" to="/" aria-label="На главную">
            <Logo />
          </Link>

          { loggedIn ? headerLoggedIn : headerNotLogged }
        </div>
      </header>
    </>
  );
}

export default Header;
