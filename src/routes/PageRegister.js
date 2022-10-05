import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegisterSubmit, isProcessing, requestError } = props;

  return (
    <>
      <Content>
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          isProcessing={isProcessing}
          requestError={requestError}
        />
      </Content>
    </>
  );
}

export default PageRegister;
