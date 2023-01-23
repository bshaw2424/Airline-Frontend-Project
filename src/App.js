import "./App.css";
import NavRoot from "./components/NavRoot";
//import SideNav from "./components/Airlines";
import Destinations from "./components/Destinations";
import Home from "./components/Home";
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
      <Route index element={<Home />} />
      <Route path="airlines" element={<Airlines />} loader={airlineLoader} />

      <Route
        path="airlines/:slug"
        element={<Destinations />}
        loader={destinationsLoader}
      />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
