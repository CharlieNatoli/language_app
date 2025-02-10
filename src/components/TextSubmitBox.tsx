import React, { useState, FormEvent, SyntheticEvent } from 'react';



interface TextSubmitProps {
  OnSubmitAnswer: (event: SyntheticEvent) => Promise<void>;
}
 
 
const TextSubmitBox = ({OnSubmitAnswer}: TextSubmitProps) => {
    // const [text, setText] = useState('');
  
    return (
      <div className="container mt-5">
      <form onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("EVENT IS HERE", e)
        OnSubmitAnswer(e); // Pass the text to your handler
      }} className="w-full">
          <div className="mb-3">
            <textarea
              className="form-control w-full border border-gray-300 rounded p-2"
              // value={text}
              // onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Enter your text here..."
            />
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="btn btn-primary border border-gray-300 px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default TextSubmitBox;