import React, { useState, useEffect } from "react";

interface LanguageSelectorProps {
  setSelectedLanguage: (event) => Promise<void>;
  selectedLanguage: string;
  OnNewTopic: () => Promise<void>;
}

const LanguageSelector = ({
  setSelectedLanguage,
  selectedLanguage,
  OnNewTopic,
}: LanguageSelectorProps) => {
  const languages = [
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
  ];

  useEffect(() => {
    if (selectedLanguage) {
      OnNewTopic();
    }
  }, [selectedLanguage]);

  const styles = {
    container: {
      margin: "20px",
      fontFamily: "Arial, sans-serif",
    },
    select: {
      padding: "8px 12px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      cursor: "pointer",
    },
    option: {
      padding: "8px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={styles.select}
      >
        {languages.map((lang) => (
          <option key={lang.name} value={lang.name} style={styles.option}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
