import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__header">Портфолио</h2>

        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href="https://kazakovas.github.io/how-to-learn/" className="portfolio__item-link" target="_blank" rel="nofollow noreferrer">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href="https://kazakovas.github.io/Russian-Travel/" className="portfolio__item-link" target="_blank" rel="nofollow noreferrer">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href="https://kazakovas.github.io/mesto-react/" className="portfolio__item-link" target="_blank" rel="nofollow noreferrer">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
