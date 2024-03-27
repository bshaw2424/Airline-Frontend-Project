function Cards({ children, id }) {
  return (
    <article
      className="card d-flex flex-sm-column flex-md-row align-items-center pt-3 px-3 mb-4 list-flex"
      key={id}
    >
      {children}
    </article>
  );
}

export default Cards;
