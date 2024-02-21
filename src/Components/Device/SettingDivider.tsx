interface SettingDividerProps {
  title: string;
  onClick: () => void;
}

const SettingDivider: React.FC<SettingDividerProps> = ({ title, onClick }) => {
  return (
    <div className="divider-container" onClick={() => onClick()}>
      <span></span>
      <span>{title}</span>
      <span></span>
    </div>
  );
};

export default SettingDivider;
