import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorizeSubmit, isProcessing, requestError } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorizeSubmit={handleAuthorizeSubmit}
          isProcessing={isProcessing}
          requestError={requestError}
        />
      </Content>
    </>
  );
}

export default PageLogin;
