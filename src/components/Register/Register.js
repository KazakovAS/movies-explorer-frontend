import Greeting from '../Greeting/Greeting';
import FormRegister from '../FormRegister/FormRegister';

import './Register.css';

function Register(props) {
  const { handleRegisterSubmit, isProcessing, serverResponse } = props;

  const heading = "Добро пожаловать!";

  return (
    <section className="register">
      <div className="register__wrapper">
        <Greeting heading={heading} />
        <FormRegister
          handleRegisterSubmit={handleRegisterSubmit}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </div>
    </section>
  );
}

export default Register;
