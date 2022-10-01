import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";
import Account from "../Account/Account";

import './Header.css';

function Header(props) {
  const { theme } = props;

  const [loggedIn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    const bodyEl = document.querySelector('.root');

    if (bodyEl.classList.contains('overflow')) {
      bodyEl.classList.remove('overflow');
    } else {
      bodyEl.classList.add('overflow');
    }

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
          />

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
      />

      {isMenuOpen && menu}
    </>
  );

  const headerNotLogged = (
    <div className="header__auth">
      <Link to="/signup" className="header__auth-link">
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

          {loggedIn ? headerLoggedIn : headerNotLogged}
        </div>
      </header>
    </>
  );
}

export default Header;
