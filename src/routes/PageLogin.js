import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorizeSubmit, requestError } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorizeSubmit={handleAuthorizeSubmit}
          requestError={requestError}
        />
      </Content>
    </>
  );
}

export default PageLogin;
