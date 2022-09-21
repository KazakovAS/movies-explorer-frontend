import { Link, useHistory } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="not-found__prev" onClick={() => history.goBack()}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
