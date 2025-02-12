import React, { forwardRef } from "react";
import { User, Bot } from "lucide-react";
import { Message, MessageType } from "../Message";
import "./ConversationPanel.css";

interface SpeechBubbleProps {
  type: MessageType;
  message: string;
  isSelected: boolean;
  onSelectBubble: () => void;
}

const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    { onSelectBubble, type = "user", message = "", isSelected = false },
    ref
  ) => {
    return (
      <>
        {type == "user" ? (
          <div className="speech-bubble-wrapper-user">
            <div
              className="speech-bubble speech-bubble-user"
              onClick={onSelectBubble}
            >
              <div>
                <p className="speech-bubble-text-area">{message}</p>
              </div>
              <div>
                <User className="conversation-icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="speech-bubble-wrapper-ai">
            <div
              className="speech-bubble speech-bubble-ai"
              onClick={onSelectBubble}
            >
              <div>
                <Bot className="conversation-icon" />
              </div>
              <div>
                <p className="speech-bubble-text-area">{message}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

interface ConversationPanelProps {
  conversation: Message[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}

// const AppHeader = ({ OnNewTopic }: HeaderProps) => {
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
