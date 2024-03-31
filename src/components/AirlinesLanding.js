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
import DisplayAirportCodeTitle from "./DisplayAirportCodeTitle";
import Error from "./Error";

export default function AirlineLanding() {
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods

  const [formSearch, setFormSearch] = useState();

  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState("select_option");
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [airportSearch, setAirportSearch] = useState(null);
  const [mapSearch, setMapSearch] = useState(null);
  const [airportSearchMessage, setAirportSearchMessage] = useState("");
  const [airportCodeErrorMessage, setAirportCodeErrorMessage] = useState("");
  const [error, setError] = useState();
  const [dropDownValue, setDropDownValue] = useState(false);

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

  function formChange(e) {
    setFormValues(e.target.value);
  }

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);

    if (e.target.value === "state") {
      setError(false);
      setAirportSearch(false);
      setFilterIcons("");
    }
    if (e.target.value === "airport_code") {
      setError(false);
      setMapSearch(false);
    }
  }

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);

    // Gets the value submitted from the input form
    const inputValueSubmittedFromForm = formValues;

    setPreviousFormValue(inputValueSubmittedFromForm);

    setFilterIcons(selectOption);

    if (selectOption === "airport_code") {
      setAirportSearch(true);
      setError(false);
      setMapSearch(false);
      setAirportSearchMessage(
        <DisplayAirportCodeTitle
          selectOption={selectOption}
          airlineAirportLength={airlineAirportLength}
          airportFormValue={inputValueSubmittedFromForm}
          airportName={airportName}
        />,
      );
    }

    if (selectOption === "state") {
      setMapSearch(true);
      setAirportSearch(false);
      setError(false);
    } else {
      setError(true);
      setMapSearch(false);
    }

    setAirportCodeErrorMessage(
      `${formValues.toUpperCase()} is not a valid ${errorMessage}`,
    );

    if (airlineAirportLength === 0 && selectOption === "airport_code") {
      setError(true);
      setAirportSearch(false);
    } else {
      setError(false);
    }

    setFormValues("");
    setDropDownValue(true);

    !displayMessageIfSearchInputNotFound(
      getAirlineDataFromLoader,
      selectOption,
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
        airportCodeErrorMessage={airportCodeErrorMessage}
      />

      <section className="container">
        <AirlineStateSearch
          airlineSearch={getAirlineDataFromLoader}
          targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
          internationalSearchValue={String(findValue)}
          selectOptionValue={selectOption}
          airportName={airportName}
          mapSearch={mapSearch}
          message={airportCodeErrorMessage}
          messageDiv={mapSearch}
          value={dropDownValue}
          isScrolled={isScrolled}
        />

        {airportSearch && airportSearchMessage}

        {error && (
          <Error message={airportCodeErrorMessage} messageDiv={error} />
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
