import { useForm } from 'react-hook-form';

import Form from "../Form/Form";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import validations from '../../utils/validations';

import './SearchForm.css';

function SearchForm(props) {
  const { handleSearchFormSubmit, isProcessing, serverResponse } = props;

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
  const [ movieName ] = watch(['movieName']);
  const {
    movie: movieRules,
  } = validations;

  function onSubmit() {
    handleSearchFormSubmit();

    // reset();
  }

  return (
    <Form
      className="search-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="search-form__item">
        <input
          {...register('movie', {
            required: movieRules.required,
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
      </div>

      <FilterCheckbox />
    </Form>
  );
}

export default SearchForm;
