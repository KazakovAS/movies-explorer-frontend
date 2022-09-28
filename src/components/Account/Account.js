import { Link } from "react-router-dom";

import './Account.css';

function Account({ className }) {
  return (
    <Link to="/profile" className={`account ${ className }`}>Аккаунт</Link>
  );
}

export default Account;
