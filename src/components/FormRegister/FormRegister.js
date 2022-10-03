import Form from '../Form/Form';
import auth from '../../utils/auth';

function FormRegister() {
  const submit = "Зарегистрироваться";
  const cta = 'Уже зарегистрированы?';
  const link = { url: '/signin', text: 'Войти' };

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
      .then(res => {
        console.log(1)
        if (res.statusCode !== 400) {
          // setRequestCompleted(true);
          // setTooltipPopupOpen(true);
          setTimeout(() => {
            // setTooltipPopupOpen(false);
            // handleLoginSubmit(email, password);
          }, 3000);
        }
      })
      .catch(() => {
        // setRequestCompleted(false);
        // setTooltipPopupOpen(true);
        console.error();
      });
  }

  return (
    <Form
      onSubmit={handleRegisterSubmit}
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
  );
}

export default FormRegister;
