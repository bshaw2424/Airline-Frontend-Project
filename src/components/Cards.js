function Cards({ children, id }) {
  return (
    <div
      className="card list-flex pt-3 px-3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignItems: "center",
      }}
      key={id}
    >
      {children}
    </div>
  );
}

export default Cards;
