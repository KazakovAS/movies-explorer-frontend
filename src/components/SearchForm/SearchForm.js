import Switcher from '../Switcher/Switcher';

function SearchForm() {
  return (
    <form action="" className="search-form">
      <label className="search-form__item">
        <input
          className="search-form__field"
          type="text"
          name="text"
          placeholder="Фильм"
          required
        />

        <button
          className="button button_accent search-form__submit"
          aria-label="Найти"
        />
      </label>

      <Switcher />
    </form>
  );
}

export default SearchForm;
