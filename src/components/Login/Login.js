import Greeting from "../Greeting/Greeting";
import FormLogin from "../FormLogin/FormLogin";

import './Login.css';

function Login(props) {
  const { handleAuthorize, isProcessing, serverResponse } = props;

  const heading = "Рады видеть!";

  return (
    <section className="login">
      <div className="login__wrapper">
        <Greeting heading={heading} />
        <FormLogin
          handleAuthorize={handleAuthorize}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </div>
    </section>
  );
}

export default Login;
