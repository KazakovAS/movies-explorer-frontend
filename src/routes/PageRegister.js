import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegisterSubmit, requestError } = props;

  return (
    <>
      <Content>
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          requestError={requestError}
        />
      </Content>
    </>
  );
}

export default PageRegister;
