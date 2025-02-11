import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import AppHeader from "./components/AppHeader";
import Loader from "./components/Loader";
import TextSubmitBox from "./components/TextSubmitBox";

import { BrowserRouter, Routes, Route } from "react-router";
import { useState, SyntheticEvent, useEffect } from "react";
import { Message, MessageType } from "./components/Message";

import { getAIResponse, startNewTopic } from "./services/api";

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(-1);
  // const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    console.log("Conversation updated:", conversation);
  }, [conversation]);

  const handleNewTopic = async (event: SyntheticEvent) => {
    // console.log("Clicked submit conversation button")
    setConversation([]);
    setConversationLoading(true);
    setSelectedId(0);
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

  const addAnswerToConversation = async (
    event: SyntheticEvent,
    type: MessageType,
    commentary: object | null
  ) => {
    const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0;
    let newHumanMessage: Message = {
      id: lastId + 1,
      type: type,
      content: event.target[0].value,
      commentary: null,
    };

    let ConversationWithHumanAnswer = [...conversation, newHumanMessage];

    setConversation(ConversationWithHumanAnswer);

    return ConversationWithHumanAnswer;
  };

  const handleSubmitAnswer = async (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;

    let ConversationWithHumanAnswer = await addAnswerToConversation(
      event,
      "user",
      null
    );
    setConversationLoading(true);

    const AIResponse = await getAIResponse(ConversationWithHumanAnswer);

    console.log("AI RESPONSE", AIResponse);
    let aiResponse = AIResponse.results.ai_response;
    let feedback = AIResponse.results.feedback;
    let key_words = AIResponse.results.key_words;

    // TOOD - lastID + 2 very hacky. Find better way
    const lastId =
      ConversationWithHumanAnswer.length > 0
        ? ConversationWithHumanAnswer.at(-1)?.id ?? 0
        : 0;
    let newAIMessage: Message = {
      id: lastId + 1,
      type: "ai",
      content: aiResponse,
      commentary: key_words,
    };

    let new_human_message =
      ConversationWithHumanAnswer[ConversationWithHumanAnswer.length - 1];
    new_human_message.commentary = feedback;

    let newConversationWithAIFeedback = [
      ...ConversationWithHumanAnswer.slice(0, -1),
      new_human_message,
      newAIMessage,
    ];

    setConversation(newConversationWithAIFeedback);
    setConversationLoading(false);

    await getAIResponse(ConversationWithHumanAnswer);
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
