import React, { useState, useEffect } from "react";

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

  const styles = {
    container: {
      margin: "20px",
      fontFamily: "Arial, sans-serif",
    },
    select: {
      backgroundColor: "transparent",
      padding: "8px 12px",
      fontSize: "20px",
      border: "0px",
      cursor: "pointer",
      color: "white",
      top: "10%",
      left: "10%",
      transform: "translateY(-20%)",
    },
    option: {
      padding: "8px",
      fontSize: "20px",
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
