import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import AirlineStateSearch from "./AirlineStateSearch";
import Airlines from "./Airlines";

// External Javascript functions in utilities file
import {
  upperCaseFirstLetterOfWord,
  displayMessageIfSearchInputNotFound,
} from "../Utilities";
import Form from "./Form";
import AirlineDisclaimer from "../components/AirlineDisclaimer";
import ValidDestinationSearch from "./ValidDestinationSearch";

export default function AirlineLanding() {
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods

  const [formSearch, setFormSearch] = useState();

  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState("select_option");
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [stateDataSearch, setStateDataSearch] = useState(true);
  const [airportDataSearch, setAirportDataSearch] = useState(false);
  // const [icaoOrIataSearch, setIcaoOrIataSearch] = useState("");
  const [airportSearchMessage, setAirportSearchMessage] = useState("");
  const [flightSearchMessage, setFlightSearchMessage] = useState("");
  const [flightSearch, setFlightSearch] = useState(false);
  // const [internationalSearch, setInternationalSearch] = useState(false);
  const [airportCodeErrorMessage, setAirportCodeErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const getLowerCaseUniqueListOfStateDestination = () => {
    const airline = getAirlineDataFromLoader
      .map(item =>
        item.destinations
          .filter(item => item.international === "true")
          .map(a => a.state.toLowerCase()),
      )
      .reduce((a, b) => a.concat(b), []);

    return [...new Set(airline)];
  };

  const findValue = getLowerCaseUniqueListOfStateDestination().includes(
    previousFormValue.toLowerCase(),
  );

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);

    if (e.target.value !== "airport_code") {
      setFilterIcons("");
      setAirportDataSearch(false);
      setShowErrorMessage(true);
    }
    if (e.target.value === "state") {
      setFlightSearch(true);
      setShowErrorMessage(false);
    }
  }

  useEffect(() => {
    if (selectOption === "airport_code") {
      setFlightSearchMessage(false);
    }

    if (selectOption === "state") {
      setShowErrorMessage(false);
      setAirportSearchMessage(false);
    }
  }, [selectOption]);

  function formChange(e) {
    setFormValues(e.target.value);
  }

  const objectOfAirlineLengthAndAirportName = () => {
    return {
      airlineAirportLength: getAirlineDataFromLoader
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
    };
  };

  const { airlineAirportLength, airportName } =
    objectOfAirlineLengthAndAirportName();

  let errorMessage;
  if (selectOption === "airport_code") {
    errorMessage = "Airport Code";
  } else {
    errorMessage = "State or International Destinaiton";
  }

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);
    // Gets the value submitted from the input form
    const inputValueSubmittedFromForm = formValues;

    // gets the option value from the select input
    const htmlSelectElementOptionValue = selectOption;

    if (airlineAirportLength === 0 && selectOption === "airport_code") {
      setShowErrorMessage(true);
    }
    if (selectOption === "state") {
      setShowErrorMessage(false);
    }
    // ?
    // : setShowErrorMessage(false);

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);

    airlineAirportLength !== 0 &&
      selectOption === "airport_code" &&
      setAirportSearchMessage(
        `${airlineAirportLength} out of 10 fly to ${inputValueSubmittedFromForm.toUpperCase()} - ( ${airportName} )`,
      );

    airlineAirportLength !== 0 &&
      selectOption !== "airport_code" &&
      setFlightSearchMessage(
        <ValidDestinationSearch
          searchValue={inputValueSubmittedFromForm.toUpperCase()}
          selectMenuValue={errorMessage}
        />,
      );

    setAirportCodeErrorMessage(
      `${formValues.toUpperCase()} is not a valid ${errorMessage}`,
    );

    if (selectOption === "state") {
      setStateDataSearch(true);
      // setIcaoOrIataSearch("false");
      // setInternationalDataSearch(false);
      // setInternationalSearch(false);
      setAirportDataSearch(false);
      setFlightSearch(true);
      setAirportDataSearch(false);
    }

    if (selectOption === "airport_code") {
      setStateDataSearch(false);
      // setInternationalDataSearch(false);
      setAirportDataSearch(true);
      setFlightSearch(false);
      setAirportDataSearch(true);
    }

    setFormValues("");

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
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
      />

      <Airlines
        targetInput={previousFormValue.toUpperCase()}
        showIconForAirportCode={filterIcons}
        message={airportSearchMessage}
        errorMessage={airportCodeErrorMessage}
        error={showErrorMessage}
      />

      <section className="container">
        {flightSearch && (
          <AirlineStateSearch
            airlineSearch={getAirlineDataFromLoader}
            targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
            internationalSearchValue={String(findValue)}
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
