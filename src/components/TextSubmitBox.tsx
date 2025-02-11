import { FormEvent } from "react";

interface TextSubmitBoxProps {
  OnSubmitAnswer: (event: FormEvent) => Promise<void>;
}

const TextSubmitBox = ({ OnSubmitAnswer }: TextSubmitBoxProps) => {
  return (
    <div className="container mt-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          OnSubmitAnswer(e);
        }}
        className="w-full"
      >
        <div className="mb-3">
          <textarea
            className="form-control w-full border border-gray-300 rounded p-2"
            style={{ backgroundColor: "#e6e6e6" }}
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
