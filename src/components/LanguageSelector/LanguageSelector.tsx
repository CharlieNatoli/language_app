import React, { useState, useEffect } from "react";
import "./LanguageSelector.css";

interface LanguageSelectorProps {
  setSelectedLanguage: (language: string) => Promise<void>;
  selectedLanguage: string;
  OnNewTopic: () => Promise<void>;
}

const LanguageSelector = ({
  setSelectedLanguage,
  selectedLanguage,
  OnNewTopic,
}: LanguageSelectorProps) => {
  const languages = [
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Portuguese", flag: "🇵🇹" },
    { name: "Hindi", flag: "🇮🇳" },
  ];

  useEffect(() => {
    if (selectedLanguage) {
      OnNewTopic();
    }
  }, [selectedLanguage]);

  return (
    <div className="language-selector-container">
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="language-selector-select"
      >
        {languages.map((lang) => (
          <option
            key={lang.name}
            value={lang.name}
            className="language-selector-option"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
