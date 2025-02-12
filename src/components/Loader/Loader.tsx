import React from "react";
import "./Loader.css";

// TODO = replace with nicer spinner
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
