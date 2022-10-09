import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Profile from '../components/Profile/Profile';

function PageProfile(props) {
  const { handleEditProfile, handleSignOut, isProcessing, serverResponse } = props;
  return (
    <>
      <Header />
      <Content>
        <Profile
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageProfile;
