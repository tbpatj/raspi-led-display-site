import { CSSProperties } from "react";

interface InputProps {
  id?: string;
  placeholder?: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (val: string) => void;
  style?: CSSProperties;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  style,
  className,
  type,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
    }
    onChange(e.target.value);
  };

  return (
    <input
      style={style}
      placeholder={placeholder}
      className={`input-textbox ${className ?? ""}`}
      onChange={handleChange}
      value={value}
      type="text"
    ></input>
  );
};

export default Input;
