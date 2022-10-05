import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorizeSubmit, isProcessing, serverResponse } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorizeSubmit={handleAuthorizeSubmit}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageLogin;
