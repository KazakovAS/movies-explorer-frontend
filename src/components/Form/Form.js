import './Form.css';

function Form(props) {
  const { onSubmit, children, className = '' } = props;

  return (
    <>
      <form className={`form ${className}`} onSubmit={onSubmit} noValidate>
        { children }
      </form>
    </>
  );
}

export default Form;
