import React from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loader;
