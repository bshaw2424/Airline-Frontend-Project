import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const [formValues, setFormValues] = useState("");
  const [selectOption, setSelectOption] = useState("select_option");
  const [filterIcons, setFilterIcons] = useState();
  const [previousFormValue, setPreviousFormValue] = useState("");
  const [airportSearch, setAirportSearch] = useState();
  const [mapSearch, setMapSearch] = useState();
  const [airportSearchMessage, setAirportSearchMessage] = useState("");
  const [airportCodeErrorMessage, setAirportCodeErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(false);
  const [links, setLinks] = useState(true);

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

  function removeNonAlphabetic(inputString) {
    // Use a regular expression to match only alphabetic characters
    return inputString.replace(/[^a-zA-Z\s]/g, "");
  }

  let getList = getAirlineDataFromLoader
    .map(getDestination => ({
      codes: getDestination.destinations
        .filter(
          location =>
            location.state === upperCaseFirstLetterOfWord(previousFormValue),
        )
        .map(location => location.airport_code),
    }))
    .filter(arrayList => arrayList.codes.length !== 0).length;

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
    errorMessage = "State or International Destination";
  }

  useEffect(() => {
    if (selectOption === "state" && getList !== 0) {
      setMapSearch(true);
      setLinks(false);
      setAirportCodeErrorMessage("");
    }

    if (selectOption === "state" && getList === 0) {
      setLinks(true);
      setMapSearch(false);
    }

    if (selectOption === "state") {
      setAirportSearch(false);
    }

    if (selectOption === "default" || selectOption === "airport_code") {
      setLinks(true);
    }
  }, [getList, selectOption, previousFormValue]);

  function formChange(e) {
    setFormValues(removeNonAlphabetic(e.target.value));
  }

  // gets the value from the select element
  function handleOptionChange(e) {
    setSelectOption(e.target.value);

    if (e.target.value === "state") {
      setError(false);
      setAirportSearch(false);
      setFilterIcons("");
      setAirportSearchMessage("");
    }
    if (e.target.value === "airport_code") {
      setError(false);
      setAirportSearch(true);
      setMapSearch(false);
      setPreviousFormValue("");
    }
  }

  const airlineSearch = e => {
    e.preventDefault();

    // Gets the value submitted from the input form
    const inputValueSubmittedFromForm = formValues;

    setPreviousFormValue(inputValueSubmittedFromForm);

    setFilterIcons(selectOption);

    if (selectOption === "airport_code" && airlineAirportLength !== 0) {
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
    } else {
      setError(true);
      setAirportSearchMessage("");
    }

    setAirportCodeErrorMessage(
      <>
        {`${formValues.toUpperCase()}
        is not a valid ${errorMessage}`}
      </>,
    );

    setFormValues("");
    setDropDownValue(true);

    if (
      selectOption === "state" &&
      inputValueSubmittedFromForm === previousFormValue
    ) {
      setError(false);
    }

    !displayMessageIfSearchInputNotFound(
      getAirlineDataFromLoader,
      selectOption,
      inputValueSubmittedFromForm,
    ).includes(true)
      ? setFormSearch(true)
      : setFormSearch(false);
  };

  return (
    <section
      style={{
        backgroundImage: "url(../airlineBackground.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    >
      <Form
        onSubmit={e => airlineSearch(e)}
        handleOptionChange={e => handleOptionChange(e)}
        formChange={e => formChange(e)}
        formValue={formValues}
        selectOption={selectOption}
      />
      {airportSearch && airportSearchMessage}
      {error && <Error message={airportCodeErrorMessage} messageDiv={error} />}
      <AnimatePresence>
        {links && (
          <motion.section
            className="my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: links ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <Airlines
              targetInput={previousFormValue.toUpperCase()}
              showIconForAirportCode={filterIcons}
              airportCodeErrorMessage={airportCodeErrorMessage}
            />
          </motion.section>
        )}
      </AnimatePresence>
      <div className="container">
        <AirlineStateSearch
          airlineSearch={getAirlineDataFromLoader}
          targetCategoryValue={upperCaseFirstLetterOfWord(previousFormValue)}
          internationalSearchValue={String(findValue)}
          selectOptionValue={selectOption}
          airportName={airportName}
          mapSearch={mapSearch}
          value={dropDownValue}
          closeButton={setMapSearch}
          airlineButtons={setLinks}
        />

        <AirlineDisclaimer />
      </div>
    </section>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
