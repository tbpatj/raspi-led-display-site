interface VerticalTransitionProps {
  children: React.ReactNode[];
  selected: number;
  id: string;
  onBack?: () => void;
}

const VerticalTransition: React.FC<VerticalTransitionProps> = ({
  children,
  selected,
  id,
  onBack,
}) => {
  return (
    <div className="transition-container">
      <div
        className={`back-nav ${selected > 0 ? "opened" : ""}`}
        onClick={() => onBack?.()}
      >
        Back
      </div>
      {children.map((child, i) => {
        return (
          <div
            className="transition-element"
            key={`${id}-transition-element-${i}`}
            style={{ top: `${(i - selected) * 100}%` }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalTransition;
