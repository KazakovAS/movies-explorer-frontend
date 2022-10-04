import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../Form/Form';
import auth from '../../utils/auth';

function FormLogin() {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const submit = "Войти";
  const cta = 'Ещё не зарегистрированы?';
  const link = { url: '/signup', text: 'Регистрация' };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  function authorize(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          // setLoggedIn(true);
          // setUserEmail(email);
          history.push('/movies');
        }
      })
      .catch(() => {
        // setRequestCompleted(false);
        // setTooltipPopupOpen(true);
      });
  }


  function handleAuthorizeSubmit(e) {
    e.preventDefault();

    authorize(email, password);
  }

  return (
    <Form
      submit={submit}
      cta={cta}
      link={link}
      onSubmit={handleAuthorizeSubmit}
    >
      <label className="form__item">
        <span className="form__label">E-mail</span>
        <input
          className="form__field"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <span className="form__field-error"></span>
      </label>
      <label className="form__item">
        <span className="form__label">Пароль</span>
        <input
          className="form__field form__field_type_error"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <span className="form__field-error">Что-то пошло не так...</span>
      </label>
    </Form>
  );
}

export default FormLogin;
