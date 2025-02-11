import React from "react";

// TODO = replace with nicer spinner
const Loader: React.FC = () => {
  return (
    <>
      <style>
        {`
   
               .spinner-container {
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   width: 100%;
                   height: 100px;
               }
   
               .loader {
                 border: 16px solid #f3f3f3;
                 border-top: 16px solid #3498db;
                 border-radius: 50%;
                 width: 120px;
                 height: 120px;
                 animation: spin 2s linear infinite;
               }
     
               @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
               }
             `}
      </style>
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loader;
