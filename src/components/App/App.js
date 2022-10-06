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
    console.log(name);

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

  // function filterMovies(moviesList) {
  //   const mainList = JSON.parse(localStorage.getItem(${moviesList}))
  //   try {
  //     const list = movieFilter(mainList, nameList);
  //     savedMoviesFilter(list, savedMovies, currentUser._id);
  //     nameList === 'movies' ? setMovies(list) : setSavedMovies(list);
  //   } catch (err) {
  //     setError(err.messsage)
  //   }
  // }

  function getMovies(type) {
    setIsProcessing(true);

    if (localStorage.getItem('movies')) {
      setIsProcessing(false);
      // filterMovies(type);

      return;
    }

    moviesApi.getMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        // filterMovies(type);
      })
      .catch((err) => {
        setServerResponse({ status: 'error', message: err.message});
      })
      .finally(() => {
        setIsProcessing(false);
        resetServerResponse();
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
