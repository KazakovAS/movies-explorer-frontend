import Greeting from "../Greeting/Greeting";
import Form from "../Form/Form";

import './Register.css';

function Register() {
  const heading = "Добро пожаловать!";
  const submit = "Зарегистрироваться";
  const cta = 'Уже зарегистрированы?';
  const link = { url: '/signin', text: 'Войти' };

  return (
    <section className="register">
      <div className="register__wrapper">
        <Greeting heading={heading} />
        <Form
          submit={submit}
          cta={cta}
          link={link}
        >
          <label className="form__item">
            <span className="form__label">Имя</span>
            <input className="form__field" type="text" name="name" required />
            <span className="form__field-error"></span>
          </label>
          <label className="form__item">
            <span className="form__label">E-mail</span>
            <input className="form__field form__field_type_error" type="email" name="email" required />
            <span className="form__field-error">Что-то пошло не так...</span>
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

export default Register;
