import './Switcher.css';

function Switcher() {
  return (
    <fieldset className="switcher">
      <legend className="switcher__legend">Короткометражки</legend>

      <label className="switcher__item">
        On
        <input type="radio" name="short-film" />
      </label>

      <label className="switcher__item">
        Off
        <input type="radio" name="short-film" />
      </label>
    </fieldset>
  );
}

export default Switcher;
