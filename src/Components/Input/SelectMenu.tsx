interface SelectMenuProps {
  options: SelectMenuOption[];
  value: string;
  onChange: (value: string) => void;
  id: string;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface SelectMenuOption {
  text: string;
  value: string;
  icon?: React.ReactNode | React.ReactNode[];
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  id,
  value,
  title,
  onChange,
  style,
  className,
}) => {
  return (
    <div className={`select-menu-container ${className ?? ""}`} style={style}>
      {title && <h1 className="device-settings-title">{title}</h1>}
      {options.map((option, i) => {
        return (
          <div
            className={`select-menu-item ${
              option.value === value ? "selected" : ""
            }`}
            onClick={() => {
              onChange(option.value);
            }}
            key={`select-menu-${id}-${i}-${option}`}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  );
};
export default SelectMenu;
