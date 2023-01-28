export default function FilterListButtons({
  btnName,
  className,
  destinations,
  choice,
}) {
  return (
    <section className="m-3">
      <button className={`btn btn-${className}`} onClick={choice}>
        {btnName}
      </button>
    </section>
  );
}
