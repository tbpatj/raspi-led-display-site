import { RouteObject } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DevicesPage from "../Pages/DevicesPage";
import TVSettingsPage from "../Pages/TVSettingsPage";
import AnimationsPage from "../Pages/AnimationsPage";
import Error404 from "../Pages/Error404";
import DebugPage from "../Pages/DebugPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error404 />,
    children: [
      {
        errorElement: <Error404 />,
        children: [
          {
            index: true,
            element: <DevicesPage />,
          },
          { path: "/animations", element: <AnimationsPage /> },
          { path: "/tv-manager", element: <TVSettingsPage /> },
          { path: "/debug", element: <DebugPage /> },
        ],
      },
    ],
  },
];

export default routes;
