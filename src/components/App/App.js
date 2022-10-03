import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AuthContext } from '../../contexts/AuthContext';

import Main from '../../routes/Main';
import PageProfile from '../../routes/PageProfile';
import PageMovies from '../../routes/PageMovies';
import PageSavedMovies from '../../routes/PageSavedMovies';
import PageLogin from '../../routes/PageLogin';
import PageRegister from '../../routes/PageRegister';
import PageNotFound from '../../routes/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

import './App.css';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(true);

  useEffect(() => {
    console.log(moviesApi.getMovies());
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn: loggedIn }}>
      <CurrentUserContext.Provider value={ currentUser }>
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={PageMovies}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={PageSavedMovies}
            />

            <ProtectedRoute
              path="/profile"
              component={PageProfile}
            />

            <Route path="/signup">
              <PageRegister />
            </Route>

            <Route path="/signin">
              <PageLogin />
            </Route>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
