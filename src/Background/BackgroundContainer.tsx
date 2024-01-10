import { CSSProperties } from "react";
import BackgroundItem from "./BackgroundItem";

interface BackgroundContainerProps {
  style?: CSSProperties;
  className?: string;
}

const items = Array(10).fill(0);

const BackgroundContainer: React.FC<BackgroundContainerProps> = () => {
  return (
    <div className="background-container">
      <div className="background-cover"></div>
      {items.map((val, i) => {
        return <BackgroundItem key={`background-item-${val}-${i}`} />;
      })}
    </div>
  );
};

export default BackgroundContainer;
