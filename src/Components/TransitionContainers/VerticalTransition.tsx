interface VerticalTransitionProps {
  children: React.ReactNode[];
  selected: number;
  id: string;
}

const VerticalTransition: React.FC<VerticalTransitionProps> = ({
  children,
  selected,
  id,
}) => {
  return (
    <div className="transition-container">
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
