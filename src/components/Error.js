export default function Error({ message, messageDiv }) {
  return (
    <>
      <div
        className="my-3 container"
        style={{
          display: !messageDiv ? "none" : "block",
        }}
      >
        <p
          className="text-center  mb-0 py-2 text-danger border border-danger text-gray"
          style={{ fontSize: "1.5rem" }}
        >
          {message}
        </p>
      </div>
    </>
  );
}
