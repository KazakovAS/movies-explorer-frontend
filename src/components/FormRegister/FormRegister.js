import { useState } from 'react';

import Form from '../Form/Form';

function FormRegister(props) {
  const { handleRegisterSubmit } = props;

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const submit = "Зарегистрироваться";
  const cta = 'Уже зарегистрированы?';
  const link = { url: '/signin', text: 'Войти' };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    handleRegisterSubmit(name, email, password);
  }

  return (
    <Form
      onSubmit={onSubmit}
      submit={submit}
      cta={cta}
      link={link}
    >
      <label className="form__item">
        <span className="form__label">Имя</span>
        <input
          className="form__field"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <span className="form__field-error"></span>
      </label>
      <label className="form__item">
        <span className="form__label">E-mail</span>
        <input
          className="form__field form__field_type_error"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <span className="form__field-error">Что-то пошло не так...</span>
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

export default FormRegister;
