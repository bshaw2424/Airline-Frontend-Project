import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import AirlineStateSearch from "./AirlineStateSearch";
import Airlines from "./Airlines";

// External Javascript functions in utilities file
import {
  upperCaseFirstLetterOfWord,
  displayMessageIfSearchInputNotFound,
  // getNumberLengthOfSearch,
  // getNameOfAirportFromAirportCodeInput,
} from "../Utilities";
import Form from "./Form";

import AirlineDisclaimer from "../components/AirlineDisclaimer";
import Error from "./Error";
import ValidDestinationSearch from "./ValidDestinationSearch";
// import ValidDestinationSearch from "./ValidDestinationSearch";

export default function AirlineLanding() {
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods

  const [formSearch, setFormSearch] = useState();

  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [stateDataSearch, setStateDataSearch] = useState(true);
  const [internationalDataSearch, setInternationalDataSearch] = useState(false);
  const [airportDataSearch, setAirportDataSearch] = useState(false);
  const [icaoOrIataSearch, setIcaoOrIataSearch] = useState("");
  const [airportSearchMessage, setAirportSearchMessage] = useState("");
  const [domesticSearch, setDomesticSearch] = useState(false);
  const [internationalSearch, setInternationalSearch] = useState(false);
  const [airportCodeErrorMessage, setAirportCodeErrorMessage] = useState("");
  const [searchMessage, setSearchMessage] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);

    if (e.target.value !== "airport_code") {
      setFilterIcons("");
      setAirportDataSearch(false);
      setAirportSearchMessage("");
    }
  }

  function formChange(e) {
    setFormValues(e.target.value);
  }

  function grace() {
    return {
      airportCode: getAirlineDataFromLoader
        .map(a =>
          a.destinations.filter(
            a => a.airport_code === formValues.toUpperCase(),
          ),
        )
        .filter(a => a.length !== 0).length,
      airportName: getAirlineDataFromLoader
        .map(a =>
          a.destinations.filter(
            a => a.airport_code === formValues.toUpperCase(),
          ),
        )
        .filter(a => a.length !== 0)
        .map(airline => airline.map(a => a.airport_name))[0],
      destinationLength: [
        ...getAirlineDataFromLoader
          .map(a =>
            a.destinations.filter(
              a => a.airport_code === formValues.toUpperCase(),
            ),
          )
          .filter(a => a.length !== 0),
      ].length,
    };
  }

  const airportCode = grace().airportCode; // Store airport code in a variable

  let errorMessage;
  if (selectOption === "airport_code") {
    errorMessage = "Airport Code";
  } else if (selectOption === "state") {
    errorMessage = "State Destination";
  } else if (selectOption === "international") {
    errorMessage = "International Destination";
  }

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);
    // Gets the value submitted from the input form
    const inputValueSubmittedFromForm = formValues;

    // gets the option value from the select input
    const htmlSelectElementOptionValue = selectOption;

    if (
      htmlSelectElementOptionValue === "international" ||
      htmlSelectElementOptionValue === "state"
    ) {
      setSearchMessage(true);
    }

    airportCode === 0 && selectOption === "airport_code"
      ? setShowErrorMessage(true)
      : setShowErrorMessage(false);

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);

    if (airportCode !== 0 && selectOption === "airport_code") {
      setAirportSearchMessage(
        `${airportCode} out of 10 fly to ${inputValueSubmittedFromForm.toUpperCase()} - ( ${
          grace().airportName
        }`,
      );
    } else {
      setAirportSearchMessage(
        <ValidDestinationSearch
          searchValue={inputValueSubmittedFromForm.toUpperCase()}
          selectMenuValue={errorMessage}
        />,
      );
    }

    setAirportCodeErrorMessage(
      `${formValues.toUpperCase()} is not a valid ${errorMessage}`,
    );

    if (selectOption === "state") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("false");
      setInternationalDataSearch(false);
      setInternationalSearch(false);
      setAirportDataSearch(false);
      setDomesticSearch(true);
      setAirportDataSearch(false);
    }

    if (selectOption === "international") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("true");
      setInternationalDataSearch(false);
      setAirportDataSearch(false);
      setDomesticSearch(false);
      setInternationalSearch(true);
      setAirportDataSearch(false);
    }

    if (selectOption === "airport_code") {
      setStateDataSearch(false);
      setInternationalDataSearch(false);
      setAirportDataSearch(true);
      setInternationalSearch(false);
      setDomesticSearch(false);
      setAirportDataSearch(true);
    }

    setFormValues("");

    setSelectOption(htmlSelectElementOptionValue);

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
            message={airportSearchMessage}
            errorMessage={airportCodeErrorMessage}
            error={showErrorMessage}
          />
        }
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
      />

      <section className="container">
        {domesticSearch && (
          <AirlineStateSearch
            airlineSearch={getAirlineDataFromLoader}
            targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
            internationalSearchValue={icaoOrIataSearch}
            selectOptionValue={selectOption}
            message={airportCodeErrorMessage}
            messageDiv={airportCodeErrorMessage}
            isScrolled={isScrolled}
          />
        )}
        {internationalSearch && (
          <AirlineStateSearch
            airlineSearch={getAirlineDataFromLoader}
            targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
            internationalSearchValue={icaoOrIataSearch}
            selectOptionValue={selectOption}
            message={airportCodeErrorMessage}
            messageDiv={airportCodeErrorMessage}
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
