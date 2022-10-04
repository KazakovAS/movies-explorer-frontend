import Content from '../components/Content/Content';
import Register from '../components/Register/Register';

function PageRegister(props) {
  const { handleRegisterSubmit } = props;

  return (
    <>
      <Content>
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
        />
      </Content>
    </>
  );
}

export default PageRegister;
