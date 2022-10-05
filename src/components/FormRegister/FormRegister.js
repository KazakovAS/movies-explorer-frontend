import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

import Form from '../Form/Form';
import validations from '../../utils/validations';

function FormRegister(props) {
  const { handleRegister, isProcessing, serverResponse } = props;
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
    name: nameRules,
    email: emailRules
  } = validations;
  const [ formName, formEmail, formPassword ] = watch(['name', 'email', 'password']);

  function onSubmit() {
    handleRegister(formName, formEmail, formPassword);

    // reset();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="form__item">
        <span className="form__label">Имя</span>
        <input
          {...register('name', {
            required: requiredRules,
            minLength: nameRules.minLength,
            maxLength: nameRules.maxLength,
            pattern: nameRules.pattern,
          })}
          className={`form__field ${errors?.name ? 'form__field_type_error' : ''}`}
          type="name"
        />

        { errors?.name && <span className="form__field-error">{ errors?.name?.message }</span> }
      </label>
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


      <div className="form__controls">
        { serverResponse.status !== ''
        && <div
          className={`form__server-response
                ${serverResponse.status === 'done'
            ? 'form__server-response_type_complete'
            : 'form__server-response_type_error'
          }`}
        >
          { serverResponse.message }
        </div>
        }
        <button className="form__submit" disabled={!isValid || isProcessing}>Зарегистрироваться</button>
        <p className="form__cta">
          Уже зарегистрированы?
          <Link to="/signin" className="form__cta-link">Войти</Link>
        </p>
      </div>
    </Form>
  );
}

export default FormRegister;
