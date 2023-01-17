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
          <NavLink to="/airlines">Airlines</NavLink>
        </div>
      </nav>

      <Outlet />
    </header>
  );
}
