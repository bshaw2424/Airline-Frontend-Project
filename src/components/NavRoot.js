import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function NavRoot() {
  return (
    <header>
      <nav className="container navbar navbar-expand-lg  py-2">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex">
            <h1>
              <Link to="/">Flight In Range</Link>
            </h1>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    style={{ color: "#333" }}
                    to="/"
                    className="mx-2 nav-link"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={{ color: "#333" }}
                    to="/airlines"
                    className="nav-link"
                  >
                    Airlines
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />

      <Footer />
    </header>
  );
}
