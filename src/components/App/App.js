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

function App() {
  const history = useHistory();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(!!localStorage.getItem("jwt"));
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ serverResponse, setServerResponse ] = useState({ status: '', message: ''});

  function handleRegister(name, email, password) {
    setIsProcessing(true);

    auth.register(name, email, password)
      .then((data) => {
        if (data._id) handleAuthorize(email, password);
      })
      .catch((err) => {
        setServerResponse({ status: 'error', message: err.message});
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
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
      .catch((err) => {
        setServerResponse({ status: 'error', message: err.message});
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      });
  }

  function handleEditProfile(name, email) {
    setIsProcessing(true);

    mainApi.editProfile(name, email)
      .then((res) => {
        setUserData(res);
        setServerResponse({ status: 'done', message: 'Готово' });
      })
      .catch((err) => {
        setServerResponse({ status: 'error', message: err.message});
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
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

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch(console.error);
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(item => item.movieId === movie.id || item.movieId === movie.movieId);

    console.log(savedMovie);

    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMovies = savedMovies.filter(m => !(movie.id === m.movieId || movie.movieId === m.movieId));

        setSavedMovies(newMovies);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (loggedIn) {
      checkToken();
      getCurrentUser();
    }

  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(data => {
          const UserMovies = data.filter(movie => movie.owner === currentUser._id);
          setSavedMovies(UserMovies);
        })
        .catch(console.error);
    }

    console.log(savedMovies)
  }, [currentUser, loggedIn]);

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
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              setServerResponse={setServerResponse}
              serverResponse={serverResponse}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={PageSavedMovies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              handleDeleteMovie={handleDeleteMovie}
              isProcessing={isProcessing}
              serverResponse={serverResponse}
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
