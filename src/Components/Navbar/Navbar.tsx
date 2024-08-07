import { Outlet, useLocation } from "react-router-dom";
import LedIcon from "../../SVGs/LedIcon";
import { Link } from "react-router-dom";
import AnimationIcon from "../../SVGs/AnimationIcon";
import TVIcon from "../../SVGs/TVIcon";
import { useEffect } from "react";

const routes = [
  { icon: <TVIcon width="30" height="44" />, path: "/tv-manager" },
  { icon: <LedIcon width="30" height="44" />, path: "/" },
  // { icon: <PowerIcon width="30" height="44" />, path: "/power" },
  { icon: <AnimationIcon width="30" height="44" />, path: "/animations" },
  { icon: <AnimationIcon width="30" height="44" />, path: "/debug" },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  const isDevicesTab = location.pathname.toLowerCase() === "/";

  return (
    <div className="body-container">
      <div className="nav-container">
        {routes.map((route, i) => {
          return (
            <div
              className={`nav-item ${
                location.pathname.toLowerCase() === route.path ? "selected" : ""
              }`}
              key={`nav-item-${i}`}
            >
              <Link to={route.path}>{route.icon}</Link>
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
