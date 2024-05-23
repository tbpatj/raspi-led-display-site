import { CSSProperties, useContext } from "react";
import BackgroundItem from "./BackgroundItem";
import { GlobalContext } from "../Context/GlobalContext";

interface BackgroundContainerProps {
  style?: CSSProperties;
  className?: string;
}

const items = Array(4).fill(0);

const BackgroundContainer: React.FC<BackgroundContainerProps> = () => {
  const { tvShown } = useContext(GlobalContext);
  return (
    <div className={"background-container"}>
      <div
        className={`background-cover ${tvShown ? "background-cover-less" : ""}`}
      ></div>
      {items.map((val, i) => {
        return <BackgroundItem index={i} key={`background-item-${val}-${i}`} />;
      })}
    </div>
  );
};

export default BackgroundContainer;
