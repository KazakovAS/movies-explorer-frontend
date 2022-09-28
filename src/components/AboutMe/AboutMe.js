import { Link } from 'react-router-dom';

import HeadingSection from "../HeadingSection/HeadingSection";

import me from "../../images/photo.jpg";
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__wrapper">
        <HeadingSection>Студент</HeadingSection>

        <div className="about-me__content">
          <img className="about-me__photo" src={me} alt="Виталий" />

          <div className="about-me__description">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
              Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link to="https://github.com/KazakovAS" className="about-me__contact">Github</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
