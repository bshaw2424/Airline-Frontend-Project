import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            margin: "0 0 0 3rem",
          }}
          className="container"
        >
          <h2>Title Goes Here</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, ipsa
            libero! Sapiente commodi distinctio fugit a exercitationem dolorem
            reprehenderit beatae similique veritatis quisquam excepturi eveniet
            numquam aspernatur, qui quod possimus.
          </p>
          <Link className="btn btn-primary" to="/airlines">
            View Airlines
          </Link>
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            border: "1px soild black",
          }}
          className="container"
        >
          <img
            style={{
              objectFit: "cover",
              height: "100%",
              Width: "100%",
            }}
            src="airport.jpg"
            alt="pch.vector on Freepik"
          />
        </div>
      </div>
    </main>
  );
}
