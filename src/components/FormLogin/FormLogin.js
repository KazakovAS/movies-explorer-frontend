import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

import Form from '../Form/Form';
import validations from '../../utils/validations';

function FormLogin(props) {
  const { handleAuthorizeSubmit, isProcessing, requestError } = props;
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    watch,
    handleSubmit,
    // reset,
  } = useForm({
    mode: 'onChange',
  });

  const {
    required:requiredRules,
    email: emailRules
  } = validations;
  const [ formEmail, formPassword ] = watch(['email', 'password']);

  function onSubmit() {
    handleAuthorizeSubmit(formEmail, formPassword);

    // reset();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="form__item">
        <span className="form__label">E-mail</span>
        <input
          {...register('email', {
            required: requiredRules,
            pattern: emailRules.pattern,
          })}
          className={`form__field ${errors?.email ? 'form__field_type_error' : ''}`}
          type="email"
        />

        { errors?.email && <span className="form__field-error">{ errors?.email?.message }</span> }
      </label>
      <label className="form__item">
        <span className="form__label">Пароль</span>
        <input
          {...register('password', {
            required: requiredRules,
          })}
          className={`form__field ${errors?.password ? 'form__field_type_error' : ''}`}
          type="password"
        />
        { errors?.password && <span className="form__field-error">{ errors?.password?.message }</span> }
      </label>

      <div className="form__error">{requestError}</div>

      <button className="form__submit" disabled={!isValid || isProcessing}>Войти</button>

      <p className="form__cta">
        Ещё не зарегистрированы?
        <Link to="/signup" className="form__cta-link">Регистрация</Link>
      </p>
    </Form>
  );
}

export default FormLogin;
