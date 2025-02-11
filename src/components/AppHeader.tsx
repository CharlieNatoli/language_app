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
      // width: "100%",
      // height: "60px",
      // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      // display: "flex",
      // alignItems: "center",
      // padding: " 20px",
    },
    title: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontSize: "20px",
      fontWeight: "bold",
      // margin: 0,
    },
    buttonContainer: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "26px",
      // transition: 'background-color 0.2s ease'
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
