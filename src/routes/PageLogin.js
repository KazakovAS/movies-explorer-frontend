import Content from '../components/Content/Content';
import Login from '../components/Login/Login';

function PageLogin(props) {
  const { handleAuthorize, isProcessing, serverResponse } = props;

  return (
    <>
      <Content>
        <Login
          handleAuthorize={handleAuthorize}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageLogin;
