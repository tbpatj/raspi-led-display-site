import { SettingsControllerItem } from "./SettingsControllerUtil";

interface MenuContainerProps {
  children: React.ReactNode | React.ReactNode[];
  option?: SettingsControllerItem;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ children, option }) => {
  return (
    <div className="select-menu-container">
      {option?.title && (
        <h1 className="device-settings-title">{option.title}</h1>
      )}
      {children}
    </div>
  );
};

export default MenuContainer;
