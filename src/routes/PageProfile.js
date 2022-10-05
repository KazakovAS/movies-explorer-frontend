import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Profile from '../components/Profile/Profile';

function PageProfile(props) {
  const { handleEditProfileSubmit, handleSignOutClick, isProcessing, serverResponse } = props;
  return (
    <>
      <Header />
      <Content>
        <Profile
          handleEditProfileSubmit={handleEditProfileSubmit}
          handleSignOutClick={handleSignOutClick}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageProfile;
