import Greeting from "../Greeting/Greeting";
import FormLogin from "../FormLogin/FormLogin";

import './Login.css';

function Login(props) {
  const { handleAuthorizeSubmit, isProcessing, responseError } = props;

  const heading = "Рады видеть!";

  return (
    <section className="login">
      <div className="login__wrapper">
        <Greeting heading={heading} />
        <FormLogin
          handleAuthorizeSubmit={handleAuthorizeSubmit}
          isProcessing={isProcessing}
          responseError={responseError}
        />
      </div>
    </section>
  );
}

export default Login;
