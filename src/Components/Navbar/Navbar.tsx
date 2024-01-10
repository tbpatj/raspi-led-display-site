import { Outlet, useLocation } from "react-router-dom";
import LedIcon from "../../SVGs/LedIcon";

const routes = [{ icon: <LedIcon width="30" height="44" />, path: "/" }];

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
              {route.icon}
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
