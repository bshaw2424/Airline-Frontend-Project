import "./App.scss";
import NavRoot from "./components/NavRoot";
import Footer from "./components/Footer";
import Home from "./components/Home";

import { destinationIndexLoader } from "./components/AirlinesLanding";
// import AirlineData, { airlinedesLoader } from "./components/AirlineData";
import Destinations, { destinationsLoader } from "./components/Destinations";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AirlineLanding from "./components/AirlinesLanding";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavRoot />}>
      <Route index element={<Home />} />
      <Route
        path="airlines"
        element={<AirlineLanding />}
        loader={destinationIndexLoader}
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
