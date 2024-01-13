import { CSSProperties } from "react";

interface InputProps {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  style?: CSSProperties;
  className?: string;
}

const Input: React.FC<InputProps> = ({ onChange, value, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      className="input-textbox"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      type="text"
    ></input>
  );
};

export default Input;
