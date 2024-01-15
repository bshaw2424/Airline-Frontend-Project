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
  // const [category, setCategory] = useState();
  const [formValue, setFormValue] = useState("");
  const [formSearch, setFormSearch] = useState(false);
  const [airlineTitle, setAirlineTitle] = useState();
  const [formCategory, setFormCategory] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");

  // gets the value from the select element
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
          airlineSearch={getAirlineDataFromLoader}
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
      return <AirlineListDisplay displayMessage={airlineTitle} />;
    }
  };

  const getMaps = (selectOptionItem, airlineLengthSearch) => {
    if (selectOptionItem === "airport_code" && airlineLengthSearch !== 0) {
      setAirportCodeSearch(true);
      setStateSearch(false);
      setInternationalSearch(false);
    } else if (selectOptionItem === "state" && airlineLengthSearch !== 0) {
      setStateSearch(true);
      setAirportCodeSearch(false);
      setInternationalSearch(false);
    } else if (
      selectOptionItem === "international" &&
      airlineLengthSearch !== 0
    ) {
      setInternationalSearch(true);
      setStateSearch(false);
      setAirportCodeSearch(false);
    } else {
      setAirportCodeSearch(false);
      setInternationalSearch(false);
      setFormSearch(false);
      setStateSearch(false);
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

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);
    // setFormValues("");

    const getLengthOfTotalAirlinesFromReturnedSubmit = getNumberLengthOfSearch(
      getAirlineDataFromLoader,
      htmlSelectElementOptionValue,
      inputValueSubmittedFromForm,
    );

    getMaps(
      htmlSelectElementOptionValue,
      inputValueSubmittedFromForm,
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
            targetInput={formValue.toUpperCase()}
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
