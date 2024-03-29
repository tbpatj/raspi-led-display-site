import { ReactComponent as ErrorIcon } from "../../SVGs/svgs/InfoIcon.svg";

interface ErrorProps {
  children?: React.ReactNode | React.ReactNode[];
}

const Error: React.FC<ErrorProps> = ({ children }) => {
  return (
    <div className="error-container">
      <ErrorIcon style={{ width: "12px" }} />
      <div>{children}</div>
    </div>
  );
};

export default Error;
