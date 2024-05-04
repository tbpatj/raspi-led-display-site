import { BasicIcon } from "./types";

const TVIcon: React.FC<BasicIcon> = ({
  width = "24",
  height = "19",
  stroke = "#ECE5EC",
  strokeWidth = "2",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.78261 17.5C5.50647 17.5 5.28261 17.7239 5.28261 18C5.28261 18.2761 5.50647 18.5 5.78261 18.5V17.5ZM18.2174 18.5C18.4935 18.5 18.7174 18.2761 18.7174 18C18.7174 17.7239 18.4935 17.5 18.2174 17.5V18.5ZM3 1.5H21V0.5H3V1.5ZM22.5 3V13.1667H23.5V3H22.5ZM1.5 13.1667V3H0.5V13.1667H1.5ZM10.087 14.6667H3V15.6667H10.087V14.6667ZM9.58696 15.1667V18H10.587V15.1667H9.58696ZM21 14.6667H13.913V15.6667H21V14.6667ZM13.913 14.6667H10.087V15.6667H13.913V14.6667ZM13.413 15.1667V18H14.413V15.1667H13.413ZM5.78261 18.5H18.2174V17.5H5.78261V18.5ZM0.5 13.1667C0.5 14.5474 1.61929 15.6667 3 15.6667V14.6667C2.17157 14.6667 1.5 13.9951 1.5 13.1667H0.5ZM22.5 13.1667C22.5 13.9951 21.8284 14.6667 21 14.6667V15.6667C22.3807 15.6667 23.5 14.5474 23.5 13.1667H22.5ZM21 1.5C21.8284 1.5 22.5 2.17157 22.5 3H23.5C23.5 1.61929 22.3807 0.5 21 0.5V1.5ZM3 0.5C1.61929 0.5 0.5 1.61929 0.5 3H1.5C1.5 2.17157 2.17157 1.5 3 1.5V0.5Z"
        fill={stroke}
      />
    </svg>
  );
};

export default TVIcon;