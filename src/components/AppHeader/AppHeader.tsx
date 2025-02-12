import { CSSProperties, MouseEvent, useState } from "react";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import "./AppHeader.css";

interface HeaderProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => Promise<void>;
}

const AppHeader = ({ selectedLanguage, setSelectedLanguage }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="header">
      <div className="header-title">Charlie's Language App</div>
      <div className="new-topic-button-container">
        <button
          className={`new-topic-button ${
            isHovered ? "new-topic-button-hovered" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          💡 New Topic ✨
        </button>
      </div>
      <div className="language-dropdown-container">
        <LanguageSelector
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        ></LanguageSelector>
      </div>
    </div>
  );
};

export default AppHeader;
