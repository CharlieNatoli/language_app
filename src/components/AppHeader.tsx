import { CSSProperties, MouseEvent } from "react";

interface HeaderProps {
  OnNewTopic: (event: MouseEvent) => Promise<void>;
}

const AppHeader = ({ OnNewTopic }: HeaderProps) => {
  const styles: { [key: string]: CSSProperties } = {
    Header: {
      top: 0,
      left: 0,
      position: "relative",
      width: "100%",
      height: " 80px",
    },
    title: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontSize: "20px",
      fontWeight: "bold",
    },
    buttonContainer: {
      position: "absolute",
      left: "80%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#0069d9",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "26px",
    },
  };

  return (
    <div style={styles.Header}>
      <div style={styles.title}>Charlie's Language App</div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={OnNewTopic}>
          New Topic
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
