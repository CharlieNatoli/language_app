import React, { CSSProperties, useState, useEffect, SyntheticEvent } from "react"; 

 

interface TitleBarProps {
  OnStartConversation: (event: SyntheticEvent) => Promise<void>;
}


const TitleBar = ({OnStartConversation}: TitleBarProps) => {
    const styles: { [key: string]: CSSProperties } = {
      titleBar: { 
        top: 0,
        left: 0,
        width: '100%',
        height: '60px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
      },
      title: {
        fontSize: '20px',
        fontWeight: 'bold',
        // color: '#333',
        margin: 0
      },
      buttonContainer: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      button: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        // transition: 'background-color 0.2s ease'
      }
    };
  
    return (
      <div style={styles.titleBar}>
        <h1 style={styles.title}>Charlie's Language App</h1>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.button}
            onClick={OnStartConversation}
          >
            New Topic
          </button>
        </div>
      </div>
    );
  };

export default TitleBar 