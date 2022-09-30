import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
  return (
    <form action="" className="search-form" noValidate>
      <div className="search-form__item">
        <input
          className="search-form__field"
          type="text"
          name="movie"
          placeholder="Фильм"
          required
        />

        <button
          className="search-form__submit"
          aria-label="Найти"
        />
      </div>

      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
