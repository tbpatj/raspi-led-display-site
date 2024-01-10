interface HorizontalTransitionProps {
  children: React.ReactNode[];
}

const HorizontalTransition: React.FC<HorizontalTransitionProps> = ({
  children,
}) => {
  return (
    <div>
      {children[1]}
      {children[0]}
    </div>
  );
};

export default HorizontalTransition;
