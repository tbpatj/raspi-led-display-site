interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <div
      className={`my-button-container ${disabled ? "disabled" : ""}`}
      onClick={() => (!disabled ? onClick() : null)}
    >
      {children}
    </div>
  );
};

export default Button;
