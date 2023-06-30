import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            borderTop: "2px solid green",
            marginTop: "0",
          }}
          className="border-top border-bottom border-top-1 border-bottom-1 border-light"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              flexDirection: "column",
              justifyContent: "end",
              width: "100%",
              height: "75%",
            }}
            className="container"
          >
            <h2
              style={{ fontSize: "3rem", width: "90%" }}
              className="pb-2 border-bottom border-bottom-1 border-dark  text-center py-2"
            >
              Let The Journey Begin
            </h2>
            <div
              style={{
                height: "75%",
                paddingLeft: "3rem",
              }}
              className="container pt-2"
            >
              <p style={{ fontSize: "1.2rem" }} className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
                ipsa libero! Sapiente commodi distinctio fugit a exercitationem
                dolorem reprehenderit beatae similique veritatis quisquam
                excepturi eveniet numquam aspernatur, qui quod possimus.
              </p>
              <div className="d-flex justify-content-end my-3">
                <Link
                  style={{ width: "30%" }}
                  className="btn btn-primary"
                  to="/airlines"
                >
                  View Airlines
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "76%",
              width: "100%",
              objectFit: "contain",
            }}
            className="container d-flex justify-content-start align-items-center "
          >
            <img
              style={{
                objectFit: "contain",
                height: "100%",
                Width: "90%",
              }}
              className="rounded"
              src="airport.jpg"
              alt="pch.vector on Freepik"
            />
          </div>
        </div>
      </div>
      <div
        style={{ height: "100vh" }}
        className="border border-top border-top-1 border-top-dark"
      >
        <p>Hello World Second Section</p>
      </div>
    </main>
  );
}
