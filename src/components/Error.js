export default function Error({ message, messageDiv }) {
  return (
    <>
      <div
        className="my-3"
        style={{
          display: messageDiv ? "block" : "none",
        }}
      >
        <p
          className="text-center mb-0 py-2 text-danger"
          style={{ fontSize: "1.5rem" }}
        >
          {message}
        </p>
      </div>
    </>
  );
}
