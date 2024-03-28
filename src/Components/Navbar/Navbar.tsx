import { Outlet, Route, useLocation } from "react-router-dom";
import LedIcon from "../../SVGs/LedIcon";
import PowerIcon from "../../SVGs/PowerIcon";
import { Link } from "react-router-dom";

const routes = [
  { icon: <LedIcon width="30" height="44" />, path: "/" },
  { icon: <PowerIcon width="30" height="44" />, path: "/power" },
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
