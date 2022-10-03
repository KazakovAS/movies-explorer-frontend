import Greeting from '../Greeting/Greeting';
import FormRegister from '../FormRegister/FormRegister';

import './Register.css';

function Register() {
  const heading = "Добро пожаловать!";

  return (
    <section className="register">
      <div className="register__wrapper">
        <Greeting heading={heading} />
        <FormRegister />
      </div>
    </section>
  );
}

export default Register;
