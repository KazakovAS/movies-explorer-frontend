import { useContext } from "react";
import { useForm } from 'react-hook-form';

import Form from "../Form/Form";

import './FormProfile.css';
import validations from '../../utils/validations';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function FormProfile(props) {
  const { handleEditProfile, handleSignOut, isProcessing, serverResponse } = props;

  const { currentUser } = useContext(CurrentUserContext);

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
    defaultValues: {
      profileName: localStorage.getItem('name'),
      profileEmail: localStorage.getItem('email'),
    },
  });
  const [ profileName, profileEmail ] = watch(['profileName', 'profileEmail']);
  const {
    required: requiredRules,
    name: nameRules,
    email: emailRules
  } = validations;

  function onSubmit() {
    handleEditProfile(profileName, profileEmail, localStorage.getItem('jwt'));

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
          {...register('profileName', {
            required: requiredRules,
            minLength: nameRules.minLength,
            maxLength: nameRules.maxLength,
            pattern: nameRules.pattern,
          })}
          className={`profile-form__field ${errors?.profileName ? 'form__field_type_error' : ''}`}
        />
      </label>
      <label className="profile-form__item">
        <span className="profile-form__label">E-mail</span>
        <input
          {...register('profileEmail', {
            required: requiredRules,
            pattern: emailRules.pattern,
          })}
          className={`profile-form__field ${errors?.profileEmail ? 'form__field_type_error' : ''}`}
          type="email"
        />
      </label>

      <div className="profile-form__controls form__controls">
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

        <button
          className="form__controls-item"
          disabled={
            !isValid
            || isProcessing
            || (profileName === currentUser.name
            && profileEmail === currentUser.email)
          }
        >
          Редактировать
        </button>

        <button
          className="form__controls-item form__controls-item_type_logout"
          onClick={handleSignOut}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </Form>
  );
}

export default FormProfile;
