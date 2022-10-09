import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegister, isProcessing, serverResponse } = props;

  return (
    <>
      <Content>
        <Register
          handleRegister={handleRegister}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
    </>
  );
}

export default PageRegister;
