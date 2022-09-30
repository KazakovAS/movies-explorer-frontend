import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <span className="filter-checkbox__legend">Короткометражки</span>

      <label className="filter-checkbox__item">
        <input className="filter-checkbox__field" type="checkbox" />
        <span className="filter-checkbox__status"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
