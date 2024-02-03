import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import InternationalSearch from "./InternationalSearch";
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
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods
  const [stateSearch, setStateSearch] = useState(false);
  const [internationalSearch, setInternationalSearch] = useState(false);
  const [airportCodeSearch, setAirportCodeSearch] = useState(false);
  const [formSearch, setFormSearch] = useState(false);
  const [airlineTitle, setAirlineTitle] = useState();
  const [formCategory, setFormCategory] = useState();
  const [dataArray, setDataArray] = useState();

  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);
    if (e.target.value !== "airport_code") {
      setAirportCodeSearch("");
      setFilterIcons("");
    }
    if (e.target.value !== "state") {
      setStateSearch(false);
    }
  }

  function formChange(e) {
    setFormValues(e.target.value);
  }

  // main components that get rendered
  const renderSearchComponent = () => {
    if (selectOption === "state" && stateSearch) {
      return (
        <AirlineStateSearch
          airlineSearch={dataArray}
          airlineName={airlineTitle}
          targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
          isScrolled={isScrolled}
          divDisplay={stateSearch === false ? "none" : null}
        />
      );
    }

    if (selectOption === "international" && internationalSearch) {
      return (
        <InternationalSearch
          airlineSearch={getAirlineDataFromLoader}
          airlineName={airlineTitle}
          targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
          isScrolled={isScrolled}
        />
      );
    }

    if (selectOption === "airport_code" && airportCodeSearch) {
      return (
        <>
          <AirlineListDisplay displayMessage={airlineTitle} />
        </>
      );
    }
  };

  const getMaps = (selectOptionItem, airlineLengthSearch) => {
    if (selectOptionItem === "airport_code" && airlineLengthSearch !== 0) {
      setAirportCodeSearch(true);
      setStateSearch(false);
      setInternationalSearch(false);
    }
    if (selectOptionItem === "state" && airlineLengthSearch !== 0) {
      setStateSearch(true);
      setAirportCodeSearch(false);
      setInternationalSearch(false);
    }
    if (selectOptionItem === "international" && airlineLengthSearch !== 0) {
      setInternationalSearch(true);
      setStateSearch(false);
      setAirportCodeSearch(false);
    }
  };

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

    setDataArray(getAirlineDataFromLoader);

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);
    setFormCategory(
      htmlSelectElementOptionValue !== "airport_code"
        ? "State"
        : "airport code",
    );

    setFormValues("");

    const getLengthOfTotalAirlinesFromReturnedSubmit = getNumberLengthOfSearch(
      getAirlineDataFromLoader,
      htmlSelectElementOptionValue,
      inputValueSubmittedFromForm,
    );

    getMaps(
      htmlSelectElementOptionValue,
      getLengthOfTotalAirlinesFromReturnedSubmit,
    );

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

  // end of submit function

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
