import { useContext } from "react";

import FormProfile from '../FormProfile/FormProfile';

import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const { handleEditProfile, handleSignOut, isProcessing, serverResponse } = props;

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__header">Привет, { currentUser.name }!</h1>

        <FormProfile
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </div>
    </section>
  );
}

export default Profile;
