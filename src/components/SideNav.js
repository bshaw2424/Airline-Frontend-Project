import { Link } from "react-router-dom"; // const airlineNameDropdownList = airline.map(airlines => (
//   <Link
//     value={airlines.name.toLowerCase()}
//     to={`/airlines/${airlines.slug}`}
//     key={airlines._id}
//     onChange={onChange}
//   >
//     <li>{airlines.name}</li>
//   </Link>
// ));

// export default function SideNav({ airline, dropDownName, value, onChange }) {
//   const getAirlineNames = airline.map((airlineName, i) => (
//     // take any empty spaces from word then set it to lower case.
//     <option
//       // .replace(/ /g, "-").toLowerCase()
//       value={airlineName}
//       key={`{airlineName-${i}`}
//     >
//       {airlineName.name}
//     </option>
//   ));

//   return (
//     <select
//       className="form-select"
//       aria-label="Default select example"
//       value={value}
//       onChange={onChange}
//     >
//       <option className="selected">{dropDownName}</option>

//       {getAirlineNames}
//     </select>
//   );
// }
