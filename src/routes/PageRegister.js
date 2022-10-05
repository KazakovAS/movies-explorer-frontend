import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegisterSubmit, isProcessing, serverResponse } = props;

  return (
    <>
      <Content>
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageRegister;
