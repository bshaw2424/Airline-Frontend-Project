import axios from "axios";
import { useState, useEffect } from "react";
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

  // state management methods
  const [stateSearch, setStateSearch] = useState(false);
  const [airportCodeSearch, setAirportCodeSearch] = useState(false);
  const [category, setCategory] = useState();
  const [formValue, setFormValue] = useState("");
  const [formSearch, setFormSearch] = useState(false);
  const [airlineTitle, setAirlineTitle] = useState();
  const [formCategory, setFormCategory] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");

  function handleOptionChange(e) {
    setSelectOption(e.target.value);
  }
  function formChange(e) {
    setFormValues(e.target.value);
  }

  const renderSearchComponent = () => {
    if (selectOption === "state" && stateSearch) {
      return (
        <AirlineStateSearch
          airlineSearch={airline}
          airlineName={airlineTitle}
          targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
          isScrolled={isScrolled}
          divDisplay={stateSearch === false ? "none" : null}
        />
      );
    }

    if (selectOption === "airport_code" && airportCodeSearch) {
      return (
        <AirlineListDisplay
          airlineSearch={airline}
          category={category}
          displayMessage={airlineTitle}
          targetCategoryValue={previousFormValue}
        />
      );
    }
  };

  const getMaps = (selectOptionItem, inputValue, airlineLengthSearch) => {
    if (selectOptionItem === "airport_code") {
      setFormCategory("Airport Code");
      setFormValue(inputValue);
    } else {
      setFormCategory("State or Country");
      setFormValue(upperCaseFirstLetterOfWord(inputValue));
    }

    if (selectOptionItem === "airport_code" && airlineLengthSearch !== 0) {
      setAirportCodeSearch(true);
      setStateSearch(false);
    } else if (selectOptionItem === "state" && airlineLengthSearch !== 0) {
      setStateSearch(true);
      setAirportCodeSearch(false);
    } else {
      setAirportCodeSearch(false);
      setFormSearch(false);
      setStateSearch(false);
    }
  };

  const getAirlineStateAndNumberOfDestinations = (
    airlineLength,
    selectOption,
    value,
  ) => {
    airlineLength === 0
      ? setAirlineTitle("")
      : setAirlineTitle(
          `${airlineLength} of 10 airlines fly to ${
            selectOption === "airport_code"
              ? `${value.toUpperCase()} - 
            ( ${getNameOfAirportFromAirportCodeInput(
              airline,
              value.toUpperCase(),
            )} )`
              : upperCaseFirstLetterOfWord(value)
          }`,
        );
  };

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);

    // Gets the value form the input form
    let inputValue = formValues;

    setPreviousFormValue(inputValue);
    setFormValues("");

    // gets the option value from the select input
    let selectFormOptionvalue = selectOption;

    setFilterIcons(selectFormOptionvalue);

    const airlineLengthSearch = getNumberLengthOfSearch(
      airline,
      selectFormOptionvalue,
      inputValue,
    );

    getMaps(selectFormOptionvalue, inputValue, airlineLengthSearch);

    getAirlineStateAndNumberOfDestinations(
      airlineLengthSearch,
      selectOption,
      inputValue,
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

  return (
    <main className="">
      <Form
        onSubmit={e => airlineSearch(e)}
        airlineLinks={
          <Airlines
            targetInput={formValue.toUpperCase()}
            showIconForAirportCode={filterIcons}
          />
        }
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
      />

      <section class="container">
        {formSearch && (
          <Error
            message={`${formValue} is not a valid ${formCategory}`}
            messageDiv={formSearch === false ? "none" : null}
          />
        )}
        {renderSearchComponent()}
        <AirlineDisclaimer />
      </section>
    </main>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
