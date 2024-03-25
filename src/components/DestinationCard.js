import SeasonalInternationalCheck from "./SeasonalInternationalCheck";

const DestinationCard = ({
  _id,
  name,
  airport_code,
  airport_name,
  city,
  state,
  location,
}) => (
  <>
    <div className="width">
      <h4 className="card-title">
        {name} - ( {airport_code} )
      </h4>
    </div>
    <div className="width ps-5 col">
      <p>
        <b>Airport:</b> {airport_name}
      </p>
      <p>
        <b>Location:</b> {city}, {state}
      </p>
    </div>

    <SeasonalInternationalCheck
      destinationCategory={location}
      stringBooleanValue={"true"}
    />
  </>
);

export default DestinationCard;
