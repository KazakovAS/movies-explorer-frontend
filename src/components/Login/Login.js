import Greeting from "../Greeting/Greeting";
import Form from "../Form/Form";

import './Login.css';

function Login() {
  const heading = "Рады видеть!";
  const submit = "Войти";
  const cta = 'Ещё не зарегистрированы?';
  const link = { url: '/signup', text: 'Регистрация' };

  return (
    <section className="login">
      <div className="login__wrapper">
        <Greeting heading={heading} />
        <Form
          submit={submit}
          cta={cta}
          link={link}
        >
          <label className="form__item">
            <span className="form__label">E-mail</span>
            <input className="form__field" type="email" name="email" required />
            <span className="form__field-error"></span>
          </label>
          <label className="form__item">
            <span className="form__label">Пароль</span>
            <input className="form__field form__field_type_error" type="password" name="password" required />
            <span className="form__field-error">Что-то пошло не так...</span>
          </label>
        </Form>
      </div>
    </section>
  );
}

export default Login;
