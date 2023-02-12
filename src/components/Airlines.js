export default function Airlines({ airlineNameData }) {
  return (
    <section>
      <h1 className="text-center mb-4">
        Explore Your Favorite Airline Destinations
      </h1>
      <div className="row mb-5 g-3">
        {airlineNameData.map(airline => (
          <div className="col-sm-6 card p-3">
            <a
              className="d-flex justify-content-center"
              href={`/airlines/${airline.slug}`}
              alt={airline.name}
            >
              <h2>{airline.name}</h2>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
