import React from "react";
import Loader from "../Loader/Loader";
import { Message } from "../Message";
import "./FeedbackPanel.css";

interface FeedbackPanelProps {
  conversation: Array<Message>;
  selectedId: number;
}

interface CommentaryProps {
  commentary: object;
  title: string;
}

const Commentary: React.FC<CommentaryProps> = ({ commentary, title }) => (
  <>
    <h1 className="commentary-title">{title}</h1>
    <div className="commentary-body">
      {Object.entries(commentary).map(([key, value]) => (
        <div key={key}>
          <b>{key}: </b> {value}
        </div>
      ))}
    </div>
  </>
);

const FeedbackPanelContents: React.FC<FeedbackPanelProps> = ({
  conversation,
  selectedId,
}) => {
  if (conversation.length === 0) {
    return null;
  }

  const currentMessage = conversation[selectedId];
  const isLastMessage = selectedId === conversation.length - 1;
  console.log("currentMessage", currentMessage);
  const commentary = currentMessage.commentary;

  const title =
    currentMessage.type === "ai" ? "Vocabulary Highlights:" : "Feedback:";

  if (isLastMessage && !commentary) {
    return <Loader />;
  }

  if (!commentary) {
    return null;
  }

  return <Commentary commentary={commentary} title={title} />;
};

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  conversation,
  selectedId,
}) => {
  return (
    <>
      <div>
        <div className="feedback-panel">
          <FeedbackPanelContents
            conversation={conversation}
            selectedId={selectedId}
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackPanel;
