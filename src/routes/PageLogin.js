import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorizeSubmit } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorizeSubmit={handleAuthorizeSubmit}
        />
      </Content>
    </>
  );
}

export default PageLogin;
