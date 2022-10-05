import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

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
import moviesApi from "../../utils/MoviesApi";

function App() {
  const history = useHistory();
  const [ currentUser, setCurrentUser ] = useState({ name: '', email: '' });
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ serverResponse, setServerResponse ] = useState({ status: '', message: ''});

  useEffect(() => {
    /** Проверка токена, получение email */
    tokenCheck();
    if (loggedIn) {
      setCurrentUser({
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
      });
      // getContent();
    }

  }, [loggedIn]);

  function handleRegisterSubmit(name, email, password) {
    setIsProcessing(true);

    auth.register(name, email, password)
      .then(() => {
        handleAuthorizeSubmit(email, password);
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      })
      .catch((err) => {
        setIsProcessing(false);
        setServerResponse({ status: 'error', message: err.message});
      });
  }

  function handleAuthorizeSubmit(email, password) {
    setIsProcessing(true);

    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          getCurrentUser(res.token);
          history.push('/movies');
        }
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      })
      .catch((err) => {
        setIsProcessing(false);
        setServerResponse({ status: 'error', message: err.message});
      });
  }

  function handleEditProfileSubmit(name, email, token) {
    setIsProcessing(true);

    mainApi.editProfile(name, email, token)
      .then((res) => {
        setUserData(res);
        setServerResponse({ status: 'done', message: 'Готово' });
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      })
      .catch((err) => {
        setIsProcessing(false);
        setServerResponse({ status: 'error', message: err.message});
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
        setUserData(res);
      })
      .catch((err) => {
        setServerResponse(err.message);
      });
  }

  function setUserData(data) {
    setCurrentUser({ name: data.name, email: data.email });
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
  }

  function tokenCheck() {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false)
            handleSignOutClick();
          }
        })
        .catch(err => {
          console.error(err);
          setLoggedIn(false)
        });
    } else {
      setLoggedIn(false);
    }
  }

  function resetServerResponse() {
    setTimeout(() => {
      setServerResponse({ status: '', message: '' });
    }, 2000);
  }

  function getMovies() {
    setIsProcessing(true);

    moviesApi.getMovies()
      .then((res) => {
        const result = res.slice(0, 7);
        console.log(result);
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      })
      .catch((err) => {
        setIsProcessing(false);
        setServerResponse({ status: 'error', message: err.message});
      });
  }

  function handleSearchFormSubmit() {
    getMovies();
  }

  return (
    <AuthContext.Provider value={{ loggedIn: loggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={PageMovies}
              handleSearchFormSubmit={handleSearchFormSubmit}
              isProcessing={isProcessing}
              serverResponse={serverResponse}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={PageSavedMovies}
            />

            <ProtectedRoute
              path="/profile"
              component={PageProfile}
              handleEditProfileSubmit={handleEditProfileSubmit}
              handleSignOutClick={handleSignOutClick}
              isProcessing={isProcessing}
              serverResponse={serverResponse}
            />

            <Route path="/signup">
              { loggedIn
                ? <Redirect to="/" />
                : <PageRegister
                    handleRegisterSubmit={handleRegisterSubmit}
                    isProcessing={isProcessing}
                    serverResponse={serverResponse}
                  />}
            </Route>

            <Route path="/signin">
              { loggedIn
                ? <Redirect to="/" />
                : <PageLogin
                    handleAuthorizeSubmit={handleAuthorizeSubmit}
                    isProcessing={isProcessing}
                    serverResponse={serverResponse}
                  />}
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
