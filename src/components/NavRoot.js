import { Link, NavLink, Outlet } from "react-router-dom";

export default function NavRoot() {
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">LOGO</Link>
        </h1>
        <div>
          <NavLink to="/">Home</NavLink>
          <Link to="/airlines/soutwest-Airlines">Airline</Link>
        </div>
      </nav>

      <Outlet />
    </header>
  );
}
