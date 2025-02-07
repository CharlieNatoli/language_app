import React, { useState, FormEvent } from 'react';


const TextSubmitBox = () => {
    const [text, setText] = useState('');
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        console.log('Submitted text:', text);
      // TODO - ADD SUBMISSION LOGIC HERE
    };

    // TODO - add loading state here too
  
    return (
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-3">
            <textarea
              className="form-control w-full border border-gray-300 rounded p-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
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