import { CSSProperties } from "react";
import ArrowThinIcon from "../../SVGs/ArrowThinIcon";

export interface DeviceSettingProps {
  title: string;
  elements: DeviceSetting;
  onClick: () => void;
  style?: CSSProperties;
  className?: string;
  value: string;
}

interface DeviceSetting {
  element: React.ReactNode | React.ReactNode[];
  icon: React.ReactNode | React.ReactNode[];
}

const DeviceSetting: React.FC<DeviceSettingProps> = ({
  elements,
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
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {elements.icon}
        </div>
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

export default DeviceSetting;
