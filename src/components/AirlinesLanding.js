import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import AirlineStateSearch from "./AirlineStateSearch";
import Airlines from "./Airlines";

import {
  upperCaseFirstLetterOfWord,
  displayMessageIfSearchInputNotFound,
  getNumberLengthOfSearch,
  getNameOfAirportFromAirportCodeInput,
} from "../Utilities";
import Error from "./Error";
import Form from "./Form";

import AirlineListDisplay from "./AirlineListDisplay";
import AirlineDisclaimer from "../component/AirlineDisclaimer";

export default function AirlineLanding() {
  const airline = useLoaderData();

  const scrollToMapRef = useRef(null);

  const scrollToMap = () => {
    scrollToMapRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // state management methods
  const [stateSearch, setStateSearch] = useState(false);
  const [airportCodeSearch, setAirportCodeSearch] = useState(false);
  const [inputTextValue, setInputTextValue] = useState("");
  const [category, setCategory] = useState();
  const [formValue, setFormValue] = useState("");
  const [formSearch, setFormSearch] = useState(false);
  const [airlineTitle, setAirlineTitle] = useState();
  const [formCategory, setFormCategory] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [changeIcon, setChangeIcon] = useState();
  const [inputField, setInputField] = useState();

  const airlineSearch = e => {
    e.preventDefault();

    // gets the input form value
    let inputValue = e.target[1].value.toUpperCase();

    // gets the option value from the select input
    let selectFormOptionvalue = e.target[0].value;

    //setUserInput(inputValue);
    setFormValue(inputValue);

    // reset the form value after form submitted
    setInputTextValue("");

    setFilterIcons(selectFormOptionvalue);
    // gets the category from data object ie airline["state"], airline["city"] etc...
    setCategory(selectFormOptionvalue);

    setChangeIcon(inputValue);

    setInputField(selectFormOptionvalue);

    const airlineLengthSearch = getNumberLengthOfSearch(
      airline,
      selectFormOptionvalue,
      inputValue,
    );

    if (selectFormOptionvalue === "airport_code") {
      setFormCategory("Airport Code");
      setFormValue(inputValue);
    } else {
      setFormCategory("State or Country");
      setFormValue(upperCaseFirstLetterOfWord(inputValue));
    }

    if (selectFormOptionvalue === "airport_code" && airlineLengthSearch !== 0) {
      setAirportCodeSearch(true);
      setStateSearch(false);
    } else if (selectFormOptionvalue === "state" && airlineLengthSearch !== 0) {
      setStateSearch(true);
      setAirportCodeSearch(false);
    } else {
      setAirportCodeSearch(false);
      setFormSearch(false);
      setStateSearch(false);
    }

    airlineLengthSearch === 0
      ? setAirlineTitle("")
      : setAirlineTitle(
          `${airlineLengthSearch} of 10 airlines fly to ${
            selectFormOptionvalue === "airport_code"
              ? `${inputValue.toUpperCase()} - 
            ( ${getNameOfAirportFromAirportCodeInput(
              airline,
              inputValue.toUpperCase(),
            )} )`
              : upperCaseFirstLetterOfWord(inputValue)
          }`,
        );

    !displayMessageIfSearchInputNotFound(
      airline,
      selectFormOptionvalue,
      inputValue,
    ).includes(true)
      ? setFormSearch(true)
      : setFormSearch(false);
  };

  // end of submit function

  // Displays error message if the input is in the wrong category
  useEffect(() => {
    const errorMessageState = setTimeout(() => setFormSearch(false), 5000);

    return () => {
      clearTimeout(errorMessageState);
    };
  }, [formSearch]);

  const clearInputFieldAfterFormSubmit = e => {
    setInputTextValue(e.target.value);
    setFormSearch(false);
    setChangeIcon(false);
  };

  return (
    <main className="container">
      <Form
        onSubmit={e => airlineSearch(e)}
        onChange={e => clearInputFieldAfterFormSubmit(e)}
        onClick={() => scrollToMap()}
        value={inputTextValue}
      />

      {formSearch && (
        <Error
          message={`${formValue} is not a valid ${formCategory}`}
          messageDiv={formSearch === false ? "none" : null}
        />
      )}
      <Airlines
        targetInput={formValue.toUpperCase()}
        showIconForAirportCode={filterIcons}
      />
      <section>
        {stateSearch && (
          <AirlineStateSearch
            airlineSearch={airline}
            airlineName={airlineTitle}
            targetCategoryValue={upperCaseFirstLetterOfWord(formValue)}
            mapref={scrollToMapRef}
            divDisplay={stateSearch === false ? "none" : null}
          />
        )}
        {airportCodeSearch && (
          <AirlineListDisplay
            airlineSearch={airline}
            category={category}
            displayMessage={airlineTitle}
            targetCategoryValue={formValue.toUpperCase()}
          />
        )}
      </section>
      <AirlineDisclaimer />
    </main>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
