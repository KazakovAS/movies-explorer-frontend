import { useContext } from "react";
import { useForm } from 'react-hook-form';

import Form from "../Form/Form";

import './FormProfile.css';
import validations from '../../utils/validations';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function FormProfile(props) {
  const { handleEditProfileSubmit, handleSignOutClick, isProcessing, responseError } = props;
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
    required: requiredRules,
    name: nameRules,
    email: emailRules
  } = validations;
  const [ formName, formEmail ] = watch(['name', 'email']);
  const { currentUser } = useContext(CurrentUserContext);

  console.log(currentUser)

  function onSubmit() {
    handleEditProfileSubmit(formName, formEmail, localStorage.getItem('jwt'));

    // reset();
  }

  return (
    <Form
      className="profile-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="profile-form__item">
        <span className="profile-form__label">Имя</span>
        <input
          {...register('name', {
            required: requiredRules,
            minLength: nameRules.minLength,
            maxLength: nameRules.maxLength,
            pattern: nameRules.pattern,
          })}
          // value={}
          className={`profile-form__field ${errors?.name ? 'form__field_type_error' : ''}`}
        />
      </label>
      <label className="profile-form__item">
        <span className="profile-form__label">E-mail</span>
        <input
          {...register('email', {
            required: requiredRules,
            pattern: emailRules.pattern,
          })}
          // value={}
          className={`profile-form__field ${errors?.email ? 'form__field_type_error' : ''}`}
          type="email"
        />
      </label>

      <div className="profile-form__controls form__controls">
        <div className="form__error">{responseError}</div>

        <button
          className="form__controls-item"
          disabled={!isValid || isProcessing}
        >
          Редактировать
        </button>

        <button
          className="form__controls-item form__controls-item_type_logout"
          onClick={handleSignOutClick}
        >
          Выйти из аккаунта
        </button>
      </div>
    </Form>
  );
}

export default FormProfile;
