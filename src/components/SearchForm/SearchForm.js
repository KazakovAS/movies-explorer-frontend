import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Form from "../Form/Form";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import validations from '../../utils/validations';

import './SearchForm.css';

function SearchForm(props) {
  const { handleSearchForm, shortMoviesStatus, handleShortFilms, isProcessing, serverResponse } = props;

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    watch,
    setValue,
    handleSubmit,
    // reset,
  } = useForm({
    mode: 'onChange',
  });
  const [ movieName ] = watch(['movie']);
  const {
    movie: movieRules,
  } = validations;

  function onSubmit() {
    handleSearchForm(movieName);

    localStorage.setItem('movieSearch', movieName);
    // reset();
  }

  useEffect(() => {
    const saveValue = localStorage.getItem('movieSearch');

    if (saveValue) {
      setValue('movie', saveValue);
    }
  }, []);

  return (
    <Form
      className="search-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="search-form__item">
        <input
          {...register('movie', {
            required: movieRules.required,
            minLength: movieRules.minLength,
          })}
          className="search-form__field"
          placeholder="Фильм"
          required
        />

        <button
          className="search-form__submit"
          aria-label="Найти"
          disabled={ !isValid || isProcessing }
        />

        { !isValid && <span className="form__error search-form__error">123</span> }
      </div>

      <FilterCheckbox
        handleShortFilms={handleShortFilms}
        shortMoviesStatus={shortMoviesStatus}
      />
    </Form>
  );
}

export default SearchForm;
