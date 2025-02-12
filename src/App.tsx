import ConversationPanel from "./components/ConversationPanel/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel/FeedbackPanel";
import AppHeader from "./components/AppHeader/AppHeader";
import Loader from "./components/Loader/Loader";
import TextSubmitBox from "./components/TextSubmitBox/TextSubmitBox";

import { useConversation } from "./utilities/ConversationHooks";
import { deselectFeedbackPanelEffect } from "./utilities/deselectFeedbackPanelEffect";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";

function App() {
  useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");

  const {
    conversation,
    conversationLoading,
    handleNewTopic,
    handleSubmitAnswer,
  } = useConversation(selectedLanguage);

  deselectFeedbackPanelEffect(setSelectedId);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="full-page">
                <AppHeader
                  OnNewTopic={handleNewTopic}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                ></AppHeader>
                <div className="outer-container">
                  <div className="left-panel">
                    <div className="left-panel-conversation">
                      <ConversationPanel
                        conversation={conversation}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                      ></ConversationPanel>
                      <div>{conversationLoading && <Loader />}</div>
                    </div>
                    <div className="left-panel-textsubmit">
                      <TextSubmitBox
                        OnSubmitAnswer={handleSubmitAnswer}
                      ></TextSubmitBox>
                    </div>
                  </div>
                  <div className="right-panel">
                    {selectedId >= 0 ? (
                      <FeedbackPanel
                        conversation={conversation}
                        selectedId={selectedId}
                      ></FeedbackPanel>
                    ) : (
                      <></>
                    )}
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
