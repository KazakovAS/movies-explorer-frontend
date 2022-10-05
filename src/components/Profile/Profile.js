import FormProfile from '../FormProfile/FormProfile';

import './Profile.css';

function Profile(props) {
  const { handleEditProfileSubmit, handleSignOutClick, isProcessing, responseError } = props;

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__header">Привет, Виталий!</h1>

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
