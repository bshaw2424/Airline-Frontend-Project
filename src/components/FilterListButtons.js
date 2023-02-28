import { NavLink } from "react-router-dom";

export default function FilterListButtons({ btnName, className, listData }) {
  return (
    <>
      <button
        className={`btn btn-outline-${className} filter-buttons mx-1`}
        onClick={listData}
      >
        <NavLink>{btnName}</NavLink>
      </button>
    </>
  );
}
