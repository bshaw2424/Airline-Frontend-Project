import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import AirlineStateSearch from "./AirlineStateSearch";
import Airlines from "./Airlines";

// External Javascript functions in utilities file
import {
  upperCaseFirstLetterOfWord,
  displayMessageIfSearchInputNotFound,
  getNumberLengthOfSearch,
  getNameOfAirportFromAirportCodeInput,
} from "../Utilities";
import Error from "./Error";
import Form from "./Form";

import AirlineDisclaimer from "../component/AirlineDisclaimer";

export default function AirlineLanding() {
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods

  const [formSearch, setFormSearch] = useState(false);
  const [airlineTitle, setAirlineTitle] = useState("");
  const [formCategory, setFormCategory] = useState();
  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [stateDataSearch, setStateDataSearch] = useState(false);
  const [showMessage, setShowMessage] = useState();
  const [internationalDataSearch, setInternationalDataSearch] = useState(false);
  const [airportDataSearch, setAirportDataSearch] = useState(false);
  const [icaoOrIataSearch, setIcaoOrIataSearch] = useState("");

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);
    if (e.target.value !== "airport_code") {
      setFilterIcons("");
      setShowMessage("");
    }
  }

  function formChange(e) {
    setFormValues(e.target.value);
  }

  const getAirlineStateAndNumberOfDestinations = (
    airlineLength,
    selectOption,
    value,
  ) => {
    if (airlineLength > 0) {
      return setAirlineTitle(
        `${airlineLength} of 10 airlines fly to ${
          selectOption === "airport_code"
            ? `${value.toUpperCase()} - 
            ( ${getNameOfAirportFromAirportCodeInput(
              getAirlineDataFromLoader,
              value.toUpperCase(),
            )} )`
            : upperCaseFirstLetterOfWord(value)
        }`,
      );
    } else {
      return setAirlineTitle("");
    }
  };

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);

    // Gets the value submitted from the input form
    let inputValueSubmittedFromForm = formValues;

    // gets the option value from the select input
    const htmlSelectElementOptionValue = selectOption;

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);
    setFormCategory(
      htmlSelectElementOptionValue !== "airport_code"
        ? "State"
        : "airport code",
    );

    if (selectOption === "state") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("false");
      setInternationalDataSearch(false);
      setAirportDataSearch(false);
      setAirlineTitle("");
    }

    if (selectOption === "international") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("true");
      setInternationalDataSearch(false);
      setAirportDataSearch(false);
    }

    if (selectOption === "airport_code") {
      setStateDataSearch(false);
      setInternationalDataSearch(false);
      setAirportDataSearch(true);
    }
    selectOption === "airport_code"
      ? setShowMessage(true)
      : setShowMessage(false);

    setFormValues("");

    const getLengthOfTotalAirlinesFromReturnedSubmit = getNumberLengthOfSearch(
      getAirlineDataFromLoader,
      htmlSelectElementOptionValue,
      inputValueSubmittedFromForm,
    );

    setSelectOption(htmlSelectElementOptionValue);

    getAirlineStateAndNumberOfDestinations(
      getLengthOfTotalAirlinesFromReturnedSubmit,
      selectOption,
      inputValueSubmittedFromForm,
    );

    !displayMessageIfSearchInputNotFound(
      getAirlineDataFromLoader,
      htmlSelectElementOptionValue,
      inputValueSubmittedFromForm,
    ).includes(true)
      ? setFormSearch(true)
      : setFormSearch(false);
  };

  // Displays error message if the input is in the wrong category
  useEffect(() => {
    const errorMessageState = setTimeout(() => setFormSearch(false), 5000);

    return () => {
      clearTimeout(errorMessageState);
    };
  }, [formSearch]);

  return (
    <main>
      <Form
        onSubmit={e => airlineSearch(e)}
        // gets the thumbs up icons and text indicator for the airport code search (i.e. BNA)
        airlineLinks={
          <Airlines
            targetInput={previousFormValue.toUpperCase()}
            showIconForAirportCode={filterIcons}
            message={airlineTitle}
            show={showMessage}
          />
        }
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
      />

      <section className="container">
        {formSearch && (
          <Error
            message={`${previousFormValue.toUpperCase()} is not a valid ${formCategory}`}
            messageDiv={formSearch === false ? "none" : null}
          />
        )}
        {stateDataSearch && (
          <AirlineStateSearch
            airlineSearch={getAirlineDataFromLoader}
            airlineName={airlineTitle}
            targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
            internationalSearchValue={icaoOrIataSearch}
            selectOptionValue={selectOption}
            isScrolled={isScrolled}
          />
        )}
        <AirlineDisclaimer />
      </section>
    </main>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
