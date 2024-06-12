import { CSSProperties, useEffect, useState } from "react";
import Input from "./Input";
import { formatDec } from "../../Utils/number";

interface DecInputProps {
  value: number;
  onChange: (val: number) => void;
  decimals?: number;
  style?: CSSProperties;
  className?: string;
}

const DecInput: React.FC<DecInputProps> = ({
  value,
  onChange,
  decimals,
  style,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value + "");
  const handleInput = (val: string) => {
    const o = formatDec(val, inputValue, decimals);
    setInputValue(o + "");
    if (typeof o === "string" && o.endsWith(".")) return;
    onChange(parseFloat(o + ""));
  };

  useEffect(() => {
    setInputValue(value + "");
  }, [value]);

  return (
    <Input
      value={inputValue}
      style={style}
      className={className}
      onChange={handleInput}
    />
  );
};

export default DecInput;
