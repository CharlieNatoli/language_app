import React from "react";
import Loader from "./Loader";
import { Message } from "./Message";

interface FeedbackPanelProps {
  conversation: Array<Message>;
  selectedId: number;
}

interface CommentaryProps {
  commentary: Record<string, string>;
  title: string;
}

const commentaryStyles = `
  .commentary-title {
    font-size: 20px;
    margin-bottom: 16px;
  }
  .commentary-body {
    font-size: 14px; 
  } 
`;

const Commentary: React.FC<CommentaryProps> = ({ commentary, title }) => (
  <>
    <style>{commentaryStyles}</style>
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
  const styles = ` 
.feedback-panel { 
background: #e6cdb8; 
border-radius: 25px;
min-height: 200px;
padding: 20px; 

} `;

  return (
    <>
      <style>{styles}</style>
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
