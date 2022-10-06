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
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(!!localStorage.getItem("jwt"));
  const [ movies, setMovies ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ serverResponse, setServerResponse ] = useState({ status: '', message: ''});

  useEffect(() => {
    if (loggedIn) {
      checkToken();
      // setCurrentUser({
      //   name: localStorage.getItem('name'),
      //   email: localStorage.getItem('email'),
      // });
      // getContent();
      getCurrentUser();
    }

  }, [loggedIn]);

  function handleRegister(name, email, password) {
    setIsProcessing(true);

    auth.register(name, email, password)
      .then(() => {
        handleAuthorize(email, password);
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

  function handleAuthorize(email, password) {
    setIsProcessing(true);

    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
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

  function handleEditProfile(name, email) {
    setIsProcessing(true);

    mainApi.editProfile(name, email)
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

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    history.push('/');
  }

  function getCurrentUser() {
    mainApi.getProfile()
      .then(res => {
        setUserData(res);
      })
      .catch((err) => {
        setServerResponse(err.message);
      });
  }

  function setUserData(data) {
    setCurrentUser(data);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth.checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false)
            handleSignOut();
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
        setMovies(res);
        localStorage.setItem('movies', JSON.stringify(res));
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

  function handleSearchForm() {
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
              loggedIn={loggedIn}
              movies={movies}
              handleSearchForm={handleSearchForm}
              isProcessing={isProcessing}
              serverResponse={serverResponse}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={PageSavedMovies}
              loggedIn={loggedIn}
            />

            <ProtectedRoute
              path="/profile"
              component={PageProfile}
              loggedIn={loggedIn}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
              isProcessing={isProcessing}
              serverResponse={serverResponse}
            />

            <Route path="/signup">
              { loggedIn
                ? <Redirect to="/" />
                : <PageRegister
                    handleRegister={handleRegister}
                    isProcessing={isProcessing}
                    serverResponse={serverResponse}
                  />}
            </Route>

            <Route path="/signin">
              { loggedIn
                ? <Redirect to="/" />
                : <PageLogin
                    handleAuthorize={handleAuthorize}
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
