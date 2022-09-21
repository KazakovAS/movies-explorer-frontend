import './Content.css';

function Content({ children, ...props }) {
  return <main {...props}>{children}</main>;
}

export default Content;
