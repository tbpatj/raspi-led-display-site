interface SelectMenuProps {
  options: SelectMenuOption[];
  value: string;
  onChange: (value: string) => void;
  id: string;
  title?: string;
  type?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * @param type - the device type, such as "addressable" | "non-addressable", this will make the option only avaliable for the specific device type
 */
export interface SelectMenuOption {
  text: string;
  value: string;
  icon?: React.ReactNode | React.ReactNode[];
  type?: string;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  id,
  value,
  title,
  onChange,
  style,
  type,
  className,
}) => {
  return (
    <div className={`select-menu-container ${className ?? ""}`} style={style}>
      {title && <h1 className="device-settings-title">{title}</h1>}
      {options.map((option, i) => {
        if (type && option?.type) {
          if (option.type !== type) return null;
        }
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
