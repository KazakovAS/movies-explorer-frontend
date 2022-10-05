import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;
