import { NavLink } from "react-router-dom";

export default function FilterListButtons({ btnName, className, choice }) {
  return (
    <>
      <button className={`btn btn-outline-${className} mx-1`} onClick={choice}>
        <NavLink>{btnName}</NavLink>
      </button>
    </>
  );
}
