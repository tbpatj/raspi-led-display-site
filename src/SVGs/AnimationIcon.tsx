import { BasicIcon } from "./types";

const AnimationIcon: React.FC<BasicIcon> = ({
  width = "22",
  height = "19",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Animation"
        d="M8.00002 11H9.50002M8.50004 9.00001H5.50004M7.50002 6.99999H9.00002M0.5 16.1818C0.5 17.2864 1.39543 18.1818 2.5 18.1818H19.5C20.6046 18.1818 21.5 17.2864 21.5 16.1818V3.18182C21.5 2.07725 20.6046 1.18182 19.5 1.18182H2.5C1.39543 1.18182 0.5 2.07726 0.5 3.18183V16.1818ZM17 9.00001C17 10.6569 15.6569 12 14 12C12.3432 12 11 10.6569 11 9.00001C11 7.34315 12.3432 6.00001 14 6.00001C15.6569 6.00001 17 7.34315 17 9.00001Z"
        stroke={stroke}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default AnimationIcon;
