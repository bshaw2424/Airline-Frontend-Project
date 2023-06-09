export default function AirlineData({ airlineName }) {
  return (
    <section className="my-4 px-0">
      <div className="container">
        <p>
          <strong>Total Destinations: </strong>
          {airlineName.destinations.length}
        </p>
        <p>
          <strong>Website: </strong>
          <a
            href={airlineName.website}
            alt={airlineName.name}
            target="_blank"
            rel="noreferrer"
          >
            {airlineName.website}
          </a>
        </p>
      </div>
    </section>
  );
}
