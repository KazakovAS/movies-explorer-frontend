import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegisterSubmit, isProcessing, responseError } = props;

  return (
    <>
      <Content>
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          isProcessing={isProcessing}
          responseError={responseError}
        />
      </Content>
    </>
  );
}

export default PageRegister;
