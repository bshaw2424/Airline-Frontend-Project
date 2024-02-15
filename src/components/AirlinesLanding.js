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

import AirlineDisclaimer from "../components/AirlineDisclaimer";

export default function AirlineLanding() {
  const getAirlineDataFromLoader = useLoaderData();

  // state management methods

  const [formSearch, setFormSearch] = useState(false);
  const [formCategory, setFormCategory] = useState();
  const [isScrolled, setIsStrolled] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState();
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [stateDataSearch, setStateDataSearch] = useState(false);
  const [internationalDataSearch, setInternationalDataSearch] = useState(false);
  const [airportDataSearch, setAirportDataSearch] = useState(false);
  const [icaoOrIataSearch, setIcaoOrIataSearch] = useState("");
  const [airportSearchMessage, setAirportSearchMessage] = useState("");
  const [domesticSearch, setDomesticSearch] = useState();
  const [internationalSearch, setInternationalSearch] = useState();
  const [searchMessage, setSearchMessage] = useState();

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);

    if (e.target.value !== "airport_code") {
      setFilterIcons("");
      setAirportDataSearch(false);
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
    };
  }
  console.log(grace());

  const getACodes = getAirlineDataFromLoader
    .map(items =>
      items.destinations.filter(
        item =>
          item.state === previousFormValue.toUpperCase() &&
          item.international === "false",
      ),
    )
    .every(a => a.length === 0);

  const vee = getACodes ? previousFormValue + " is not a " + formCategory : "";

  console.log(vee);

  const airlineSearch = e => {
    e.preventDefault();

    setIsStrolled(true);

    // Gets the value submitted from the input form
    let inputValueSubmittedFromForm = formValues;

    // gets the option value from the select input
    const htmlSelectElementOptionValue = selectOption;

    if (
      htmlSelectElementOptionValue === "international" ||
      htmlSelectElementOptionValue === "state"
    ) {
      setSearchMessage(true);
    }

    htmlSelectElementOptionValue === "airport_code"
      ? setAirportSearchMessage(
          `${
            grace().airportCode
          } out of 10 fly to ${inputValueSubmittedFromForm.toUpperCase()} - ( ${
            grace().airportName
          } )`,
        )
      : setAirportSearchMessage("");

    setPreviousFormValue(inputValueSubmittedFromForm);
    setFilterIcons(htmlSelectElementOptionValue);
    setFormCategory(() => {
      if (htmlSelectElementOptionValue === "airport_code") {
        return "Airport Code";
      } else if (htmlSelectElementOptionValue === "state") {
        return "State";
      } else {
        return "International";
      }
    });

    if (selectOption === "state") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("false");
      setInternationalDataSearch(false);
      setInternationalSearch(false);
      setAirportDataSearch(false);
      setDomesticSearch(true);
    }

    if (selectOption === "international") {
      setStateDataSearch(true);
      setIcaoOrIataSearch("true");
      setInternationalDataSearch(false);
      setAirportDataSearch(false);
      setDomesticSearch(false);
      setInternationalSearch(true);
    }

    if (selectOption === "airport_code") {
      setStateDataSearch(false);
      setInternationalDataSearch(false);
      setAirportDataSearch(true);
      setInternationalSearch(false);
      setDomesticSearch(false);
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
            show={airportDataSearch}
          />
        }
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
      />

      <section className="container">
        {/* {formSearch && (
          <Error
            message={`${previousFormValue.toUpperCase()} is not a valid ${formCategory}`}
            messageDiv={formSearch === false ? "none" : null}
          />
        )} */}
        {stateDataSearch && (
          <AirlineStateSearch
            airlineSearch={getAirlineDataFromLoader}
            targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
            internationalSearchValue={icaoOrIataSearch}
            selectOptionValue={selectOption}
            domesticSearch={domesticSearch}
            internationalSearch={internationalSearch}
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
