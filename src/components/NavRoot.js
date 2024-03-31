import { Link, NavLink, Outlet } from "react-router-dom";

export default function NavRoot() {
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "hsl(51, 0%, 0%)",
          color: "#fff",
        }}
      >
        <nav className="container d-flex justify-content-between align-items-center py-2">
          <h1>
            <Link to="/" className="navbar-brand">
              Flight In Range
            </Link>
          </h1>
          <div className="d-flex">
            <NavLink style={{ color: "#fff" }} Link to="/" className="mx-2">
              Home
            </NavLink>

            <NavLink style={{ color: "#fff" }} to="/airlines">
              Airlines
            </NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
    </header>
  );
}
