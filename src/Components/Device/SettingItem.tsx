import { CSSProperties } from "react";
import ArrowThinIcon from "../../SVGs/ArrowThinIcon";

export interface SettingItemProps {
  title: string;
  icon: React.ReactNode | React.ReactNode[];
  onClick: () => void;
  style?: CSSProperties;
  className?: string;
  value: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onClick,
  style,
  className,
  value,
}) => {
  return (
    <div
      style={style}
      className={`device-settings-item ${className ?? ""}`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="device-settings-icon-title ">
        <div className="device-settings-icon-container">{icon ? icon : ""}</div>
        {title
          .split("_")
          .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
          .join(" ")}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div className="device-settings-value">{value}</div>
        <ArrowThinIcon
          width="11"
          height="20"
          style={{
            transformOrigin: "center",
            transform: "rotate(180deg)",
          }}
          stroke="inherit"
        />
        {/* <Icon */}
      </div>
    </div>
  );
};

export default SettingItem;
