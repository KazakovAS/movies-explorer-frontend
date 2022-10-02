import HeadingSection from "../HeadingSection/HeadingSection";

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <HeadingSection>О проекте</HeadingSection>

        <div className="about-project__content">
          <article className="about-project__item">
            <h3 className="about-project__title">
              Дипломный проект включал 5 этапов
            </h3>

            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>

          <article className="about-project__item">
            <h3 className="about-project__title">
              На выполнение диплома ушло 5 недель
            </h3>

            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>

        <ul className="program">
          <li className="program__item">
            <div className="program__time program__time_green">
              1 неделя
            </div>
            <p className="program__technology">Back-end</p>
          </li>

          <li className="program__item">
            <div className="program__time">
              4 недели
            </div>
            <p className="program__technology">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
