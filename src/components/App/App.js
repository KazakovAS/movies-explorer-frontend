import { Route, Switch } from 'react-router-dom';

import Main from '../../routes/Main';
import PageProfile from '../../routes/PageProfile';
import PageMovies from '../../routes/PageMovies';
import SavedMovies from '../../routes/SavedMovies';
import PageLogin from '../../routes/PageLogin';
import PageRegister from '../../routes/PageRegister';
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
          <PageMovies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <PageProfile />
        </Route>

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
  );
}

export default App;
