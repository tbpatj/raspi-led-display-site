import { RouteObject } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DevicesPage from "../Pages/DevicesPage";

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
          { path: "/power", element: <div>page</div> },
        ],
      },
    ],
  },
];

export default routes;
