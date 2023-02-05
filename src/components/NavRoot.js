import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function NavRoot() {
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "blue",
        }}
      >
        <nav className="container nav d-flex justify-content-between align-items-center py-2">
          <h1>
            <Link to="/" className="navbar-brand">
              LOGO
            </Link>
          </h1>
          <div className="d-flex">
            <NavLink Link to="/" className="mx-2">
              Home
            </NavLink>

            <NavLink to="/airlines">Airlines</NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
      <Footer />
    </header>
  );
}
