import { CSSProperties, MouseEvent, useState } from "react";

interface HeaderProps {
  OnNewTopic: (event: MouseEvent) => Promise<void>;
}

const AppHeader = ({ OnNewTopic }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles: { [key: string]: CSSProperties } = {
    Header: {
      top: 0,
      left: 0,
      position: "relative",
      width: "100%",
      height: " 80px",
      backgroundColor: "#575757",
    },
    title: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontFamily: "Georgia",
      fontSize: "36px",
      color: "white",
      fontWeight: "bold",
    },
    buttonContainer: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "transparent",
      color: isHovered ? "black" : "white",
      fontWeight: isHovered ? "bold" : "",
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
        <button
          style={styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={OnNewTopic}
        >
          💡 New Topic ✨
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
