import "./App.css";
import IndexSettings from "./IndexSettings/IndexSettings";
import BackgroundContainer from "./Background/BackgroundContainer";
import { GlobalContextProvider } from "./Context/GlobalContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./Router/routes";
const router = createBrowserRouter(routes, { basename: "/" });

function App() {
  return (
    <div className="basic-color">
      <GlobalContextProvider>
        <BackgroundContainer />
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
