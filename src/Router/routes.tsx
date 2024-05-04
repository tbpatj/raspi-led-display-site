import { RouteObject } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DevicesPage from "../Pages/DevicesPage";
import TVSettingsPage from "../Pages/TVSettingsPage";
import AnimationsPage from "../Pages/AnimationsPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navbar />,
    errorElement: <div>404</div>,
    children: [
      {
        errorElement: <div>404</div>,
        children: [
          {
            index: true,
            element: <DevicesPage />,
          },
          { path: "/animations", element: <AnimationsPage /> },
          { path: "/tv", element: <TVSettingsPage /> },
        ],
      },
    ],
  },
];

export default routes;
