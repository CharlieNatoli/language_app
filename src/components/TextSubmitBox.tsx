import { FormEvent, useState } from "react";
import { ArrowUp } from "lucide-react";

interface TextSubmitBoxProps {
  OnSubmitAnswer: (event: FormEvent) => Promise<void>;
}

const TextSubmitBox = ({ OnSubmitAnswer }: TextSubmitBoxProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      OnSubmitAnswer(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
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
        // width: "100",
        margin: "20px",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder=""
        style={{
          background: "#e4e4e4",
          width: "100%",
          height: "auto",
          padding: "10px",
          paddingRight: "40px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "none",
          lineHeight: "1.5",
        }}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      <button
        type="submit"
        style={{
          position: "absolute",
          right: "8px",
          top: "20%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
        }}
        onClick={handleSubmit}
      >
        <ArrowUp size={20} color="#666" />
      </button>
    </form>
  );
};

export default TextSubmitBox;
