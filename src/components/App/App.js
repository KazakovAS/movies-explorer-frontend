import { Route, Switch } from 'react-router-dom';

import Main from '../../routes/Main';
import Profile from '../../routes/Profile';
import Movies from '../../routes/Movies';
import SavedMovies from '../../routes/SavedMovies';
import Login from '../../routes/Login';
import Register from '../../routes/Register';
import PageNotFound from '../../routes/PageNotFound';

import './App.css';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
