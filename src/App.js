import "./App.css";
import NavRoot from "./components/NavRoot";
//import SideNav from "./components/Airlines";
import Destinations from "./components/Destinations";
import { destinationsLoader } from "./components/Destinations";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Airlines, { airlineLoader } from "./components/Airlines";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavRoot />}>
      <Route path="airlines" element={<Airlines />} loader={airlineLoader}>
        <Route
          path=":slug"
          element={<Destinations />}
          loader={destinationsLoader}
        />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
