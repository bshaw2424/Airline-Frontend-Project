import React from "react";

export default function Footer() {
  return (
    <footer className="py-3" style={{ background: "hsla(226, 100%, 70%, 1)" }}>
      <div>
        <p
          className="container d-flex justify-content-center align-item-center"
          style={{ color: "#fff" }}
        >
          &copy; {new Date().getFullYear()} - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
