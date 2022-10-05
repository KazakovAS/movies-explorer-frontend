import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Profile from '../components/Profile/Profile';

function PageProfile(props) {
  const { handleSignOutClick } = props;
  return (
    <>
      <Header />
      <Content>
        <Profile
          handleSignOutClick={handleSignOutClick}
        />
      </Content>
    </>
  );
}

export default PageProfile;
