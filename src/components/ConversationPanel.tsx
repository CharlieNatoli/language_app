import React, { forwardRef } from "react";
import { User, Bot } from "lucide-react";
import { Message, MessageType } from "./Message";

interface SpeechBubbleProps {
  type: MessageType;
  message: string;
  isSelected: boolean;
  onSelectBubble: () => void;
}

// const ConversationPanel = forwardRef<HTMLDivElement, ConversationPanelProps>(({
//   conversation,
//   selectedId,
//   setSelectedId,
// }, ref)  => {

const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    { onSelectBubble, type = "user", message = "", isSelected = false },
    ref
  ) => {
    // Base styles for the speech bubble
    const bubbleStyle = {
      display: "flex",
      alignItems: "center",
      padding: "5px",
      borderRadius: "1rem",
      cursor: "pointer",
      backgroundColor: type === "user" ? "#3B82F6" : "#DBEAFE",
      color: type === "user" ? "#FFFFFF" : "#1F2937",
      marginLeft: type === "user" ? "auto" : "0",
      ...(isSelected && {
        boxShadow: "0 0 0 2px #2563EB, 0 0 0 4px #FFFFFF",
      }),
    };

    // Icon container styles
    const iconStyle = {
      right: "1rem",
      left: "1rem",
    };

    // Icon styles
    const iconComponentStyle = {
      width: "1.25rem",
      height: "1.25rem",
      padding: "1px",
    };

    // Content container styles
    const contentStyle = {};

    // Message text styles
    const messageStyle = {
      fontSize: "18px",
      marginLeft: "1rem",
      marginRight: "1rem",
    };

    // Wrapper styles for width control
    const wrapperStyle = {
      padding: "5px",
      paddingRight: type === "ai" ? ("30px" as const) : ("" as const),
      paddingLeft: type === "ai" ? ("" as const) : ("30px" as const),
    };

    const IconComponent = type === "user" ? User : Bot;
    // TODO - why is there the extra line at the bottom?
    // TODO - cleaner way to have if statement here / all these settings??
    return (
      <div style={wrapperStyle} className="speech-bubble">
        {type == "user" ? (
          <div
            style={bubbleStyle}
            onClick={onSelectBubble}
            dont-deselect-feedback-panel
          >
            <div style={contentStyle}>
              <p style={messageStyle}>{message}</p>
            </div>
            <div style={iconStyle}>
              <IconComponent style={iconComponentStyle} />
            </div>
          </div>
        ) : (
          <div
            style={bubbleStyle}
            onClick={onSelectBubble}
            dont-deselect-feedback-panel
          >
            <div style={iconStyle}>
              <IconComponent style={iconComponentStyle} />
            </div>
            <div style={contentStyle}>
              <p style={messageStyle}>{message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

interface ConversationPanelProps {
  conversation: Message[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}

const ConversationPanel = forwardRef<HTMLDivElement, ConversationPanelProps>(
  ({ conversation, selectedId, setSelectedId }, ref) => {
    return (
      <div className="min-h-screen">
        <div className="w-3/5 mx-auto p-4">
          <div className="h-96 overflow-y-auto space-y-8">
            {conversation.map((message: Message) => (
              <SpeechBubble
                key={message.id}
                type={message.type}
                message={message.content}
                isSelected={selectedId === message.id}
                onSelectBubble={() => setSelectedId(message.id)}
                ref={ref}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ConversationPanel;
