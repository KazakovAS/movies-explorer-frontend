import './Form.css';

function Form(props) {
  const { onSubmit, children } = props;

  return (
    <>
      <form className="form" onSubmit={onSubmit} noValidate>
        { children }
      </form>
    </>
  );
}

export default Form;
