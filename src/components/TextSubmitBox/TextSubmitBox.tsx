import React, { FormEvent, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./TextSubmitBox.css";

interface TextSubmitBoxProps {
  OnSubmitAnswer: (answer: string) => Promise<void>;
}

const TextSubmitBox = ({ OnSubmitAnswer }: TextSubmitBoxProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      OnSubmitAnswer(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (text.trim()) {
        e.preventDefault();
        OnSubmitAnswer(text);
        setText("");
      }
    }
  };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        handleSubmit(e);
      }}
      style={{
        position: "relative",
        margin: "20px",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder=""
        onKeyDown={handleKeyDown}
        className="text-submit-box w-full"
      />
      <button
        type="submit"
        className="text-submit-button"
        onClick={handleSubmit}
      >
        <ArrowUp size={20} color="#666" />
      </button>
    </form>
  );
};

export default TextSubmitBox;
