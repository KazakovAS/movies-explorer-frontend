import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorizeSubmit, isProcessing, responseError } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorizeSubmit={handleAuthorizeSubmit}
          isProcessing={isProcessing}
          responseError={responseError}
        />
      </Content>
    </>
  );
}

export default PageLogin;
