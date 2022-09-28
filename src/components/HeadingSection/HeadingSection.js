import './HeadingSection.css';

function HeadingSection({ children, ...props }) {
  return <h2 className="heading-section" {...props}>{children}</h2>;
}

export default HeadingSection;
