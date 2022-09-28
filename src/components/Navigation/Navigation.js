import { NavLink } from 'react-router-dom';

import Account from "../Account/Account";

import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation menu-navigation">
      <ul className="navigation__list">
        <li className="navigation__item menu-navigation__item">
          <NavLink exact to="/" className="navigation__link" activeClassName="navigation__link_active">Главная</NavLink>
        </li>
        <li className="navigation__item menu-navigation__item">
          <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
        </li>
        <li className="navigation__item menu-navigation__item">
          <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <Account className="menu-navigation__account" />
    </nav>
  );
}

export default Navigation;
