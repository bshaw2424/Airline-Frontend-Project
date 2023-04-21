import "./App.scss";
import NavRoot from "./components/NavRoot";
import Footer from "./components/Footer";
import Destinations from "./components/Destinations";
import Home from "./components/Home";
import AirlineSearch, {
  destinationIndexLoader,
} from "./components/AirlineSearch";
import AirlineData, { airlinedesLoader } from "./components/AirlineData";
import { destinationsLoader } from "./components/Destinations";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AirlineLanding, { airlineLoader } from "./components/AirlinesLanding";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavRoot />}>
      <Route index element={<Home />} />
      <Route
        path="airlines"
        element={<AirlineLanding />}
        loader={airlineLoader}
      />
      <Route
        path="airlines/info"
        element={<AirlineSearch />}
        loader={destinationIndexLoader}
      />
      <Route
        path="airlines/:slug/details"
        element={<AirlineData />}
        loader={airlinedesLoader}
      />
      <Route
        path="airlines/:slug/destinations"
        element={<Destinations />}
        loader={destinationsLoader}
      />
      <Route path="*" element={"Page not found"} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
