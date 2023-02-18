import { Link } from "react-router-dom";
export default function SideNav({ airline }) {
  const airlineNameDropdownList = airline.map(airlines => (
    <Link to={`/airlines/${airlines.slug}`}>
      <li>{airlines.name}</li>
    </Link>
  ));

  return <ul className="dropdown-menu px-2">{airlineNameDropdownList}</ul>;
}
