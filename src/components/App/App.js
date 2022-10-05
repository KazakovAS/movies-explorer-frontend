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
import mainApi from "../../utils/MainApi";

function App() {
  const history = useHistory();
  const [ currentUser, setCurrentUser ] = useState({ name: '', email: '' });
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ requestError, setRequestError ] = useState('');

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [loggedIn]);

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        handleAuthorizeSubmit(email, password);
      })
      .catch((err) => {
        setRequestError(err.message);
      });
  }

  function handleAuthorizeSubmit(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          getCurrentUser(res.token);
          history.push('/movies');
        }
      })
      .catch((err) => {
        setRequestError(err.message);
      });
  }

  function handleSignOutClick() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    history.push('/');
  }

  function getCurrentUser(token) {
    mainApi.getProfile(token)
      .then(res => {
        setCurrentUser({ name: res.name, email: res.email });
      })
      .catch((err) => {
        setRequestError(err.message);
      });
  }

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
              handleSignOutClick={handleSignOutClick}
            />

            <Route path="/signup">
              <PageRegister
                handleRegisterSubmit={handleRegisterSubmit}
                requestError={requestError}
              />
            </Route>

            <Route path="/signin">
              <PageLogin
                handleAuthorizeSubmit={handleAuthorizeSubmit}
                requestError={requestError}
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
