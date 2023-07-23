export default function AirlineListDisplay({ displayMessage }) {
  return (
    <div
      className="mt-4"
      style={{
        width: "100%",
      }}
    >
      <h2 className="text-center">{displayMessage}</h2>
    </div>
  );
}
