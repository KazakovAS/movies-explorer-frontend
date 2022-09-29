import { Link } from 'react-router-dom';

import './Form.css';

function Form(props) {
  const { submit, cta, link, children } = props;

  return (
    <>
      <form className="form" action="" noValidate>
        { children }

        <button className="form__submit">{ submit }</button>

        <p className="form__cta">
          { cta }
          <Link href={ link.url } className="form__cta-link">{ link.text }</Link>
        </p>
      </form>
    </>
  );
}

export default Form;
