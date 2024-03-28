import { CSSProperties } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  style,
}) => {
  return (
    <div
      className={`my-button-container ${disabled ? "disabled" : ""} ${
        className ?? ""
      }`}
      style={style}
      onClick={() => (!disabled ? onClick() : null)}
    >
      {children}
    </div>
  );
};

export default Button;
