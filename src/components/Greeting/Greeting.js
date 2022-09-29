import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import './Greeting.css';

function Greeting(props) {
  const { heading } = props;

  return (
    <div className="greeting">
      <Link to="/" className="greeting__logo">
        <Logo />
      </Link>

      <h1 className="greeting__header">{ heading }</h1>
    </div>
  );
}

export default Greeting;
