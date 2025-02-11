import { CSSProperties, MouseEvent } from "react";

interface HeaderProps {
  OnNewTopic: (event: MouseEvent) => Promise<void>;
}

const AppHeader = ({ OnNewTopic }: HeaderProps) => {
  const styles: { [key: string]: CSSProperties } = {
    Header: {
      top: 0,
      left: 0,
      width: "100%",
      height: "60px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: 0,
    },
    buttonContainer: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      // transition: 'background-color 0.2s ease'
    },
  };

  return (
    <div style={styles.Header}>
      <h1 style={styles.title}>Charlie's Language App</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={OnNewTopic}>
          New Topic
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
