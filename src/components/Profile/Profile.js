import { useContext } from "react";

import FormProfile from '../FormProfile/FormProfile';

import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const { handleEditProfileSubmit, handleSignOutClick, isProcessing, responseError } = props;

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__header">Привет, { currentUser.name }!</h1>

        <FormProfile
          handleEditProfileSubmit={handleEditProfileSubmit}
          handleSignOutClick={handleSignOutClick}
          isProcessing={isProcessing}
          responseError={responseError}
        />
      </div>
    </section>
  );
}

export default Profile;
