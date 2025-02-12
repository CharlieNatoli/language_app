import { CSSProperties, MouseEvent, useState } from "react";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import "./AppHeader.css";

interface HeaderProps {
  OnNewTopic: () => Promise<void>;
  selectedLanguage: string;
  setSelectedLanguage: () => Promise<void>;
}

const AppHeader = ({
  OnNewTopic,
  selectedLanguage,
  setSelectedLanguage,
}: HeaderProps) => {
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
          onClick={OnNewTopic}
        >
          💡 New Topic ✨
        </button>
      </div>
      <div className="language-dropdown-container">
        <LanguageSelector
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
          OnNewTopic={OnNewTopic}
        ></LanguageSelector>
      </div>
    </div>
  );
};

export default AppHeader;
