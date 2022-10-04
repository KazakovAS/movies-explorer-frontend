import { useState, useEffect, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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

import './App.css';
import auth from "../../utils/auth";

function App() {
  const history = useHistory();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userEmail, setUserEmail ] = useState('');

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
      .then(res => {
        if (res.statusCode !== 400) {
          // setRequestCompleted(true);
          // setTooltipPopupOpen(true);
          setTimeout(() => {
            // setTooltipPopupOpen(false);
            handleAuthorizeSubmit(email, password);
          }, 3000);
        }
      })
      .catch((err) => {
        // setRequestCompleted(false);
        // setTooltipPopupOpen(true);
        console.error(err);
      });
  }

  function handleAuthorizeSubmit(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/movies');
        }
      })
      .catch(() => {
        // setRequestCompleted(false);
        // setTooltipPopupOpen(true);
      });
  }

  return (
    <AuthContext.Provider value={{ loggedIn: loggedIn, setLoggedIn: setLoggedIn }}>
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
              <PageRegister
                handleRegisterSubmit={handleRegisterSubmit}
              />
            </Route>

            <Route path="/signin">
              <PageLogin
                handleAuthorizeSubmit={handleAuthorizeSubmit}
              />
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
