import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import AppHeader from "./components/AppHeader";
import Loader from "./components/Loader";
import TextSubmitBox from "./components/TextSubmitBox";

import { BrowserRouter, Routes, Route } from "react-router";
import { useState, SyntheticEvent, useEffect } from "react";
import { Message } from "./components/Message";
import { getAIResponse, startNewTopic } from "./services/api";

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    console.log("Conversation updated:", conversation);
  }, [conversation]);

  const handleNewTopic = async (event: SyntheticEvent) => {
    try {
      setConversation([]);
      setConversationLoading(true);
      setSelectedId(0);

      const message = await startNewTopic();
      setConversation([message]);
      setConversationLoading(false);
    } catch (error) {
      console.error("Failed to start new topic:", error);
      // Add user feedback for error
    } finally {
      setConversationLoading(false);
    }
  };

  const getLastIdInConversation = () => {
    const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0;
    return lastId;
  };

  const handleSubmitAnswer = async (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;

    // add human response to conversation
    let lastId = getLastIdInConversation();
    let userMessage: Message = {
      id: lastId + 1,
      type: "user",
      content: event.target[0].value,
      commentary: null,
    };

    let ConversationWithUserAnswer = [...conversation, userMessage];

    setConversation(ConversationWithUserAnswer);
    setConversationLoading(true);

    // get AI response
    const AIResponse = await getAIResponse(ConversationWithUserAnswer);

    // update conversation post-AI response
    let newAIMessage: Message = {
      id: lastId + 2,
      type: "ai",
      content: AIResponse.results.ai_response,
      commentary: AIResponse.results.key_words,
    };

    let userMessageWithCommentary =
      ConversationWithUserAnswer[ConversationWithUserAnswer.length - 1];

    userMessageWithCommentary.commentary = AIResponse.results.feedback;

    let newConversationWithAIFeedback = [
      ...ConversationWithUserAnswer.slice(0, -1),
      userMessageWithCommentary,
      newAIMessage,
    ];

    setConversation(newConversationWithAIFeedback);
    setConversationLoading(false);
  };

  const styles = `
  .full-page {
  background: #bfbfbf;
  }
  .outer-container { 
    display: flex;
    min-height: 100vh;
  } 

  .conversation-panel {
    width: 50%;
    height: 100vh;
    overflow-y: auto;
    padding: 1rem;
  }

  .conversation-panel > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .content-panel {
    width: 50%;
    height: 100vh;
    padding: 1rem;
  }`;

  let selected_idx = 4;

  return (
    <>
      <style>{styles}</style>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="full-page">
                <AppHeader OnNewTopic={handleNewTopic}></AppHeader>
                <div className="outer-container">
                  <div className="conversation-panel">
                    <ConversationPanel
                      conversation={conversation}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                    ></ConversationPanel>

                    {conversationLoading ? <Loader /> : <></>}
                    <TextSubmitBox
                      OnSubmitAnswer={handleSubmitAnswer}
                    ></TextSubmitBox>
                  </div>
                  <div className="content-panel">
                    <FeedbackPanel
                      conversation={conversation}
                      selectedId={selectedId}
                    ></FeedbackPanel>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
