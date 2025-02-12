import ConversationPanel from "./components/ConversationPanel/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel/FeedbackPanel";
import AppHeader from "./components/AppHeader/AppHeader";
import Loader from "./components/Loader/Loader";
import TextSubmitBox from "./components/TextSubmitBox/TextSubmitBox";

import { BrowserRouter, Routes, Route } from "react-router";
import { useState, SyntheticEvent, useEffect, useRef } from "react";
import { Message } from "./components/Message";
import { getAIResponse, startNewTopic } from "./services/api";
import "./App.css";

const dummyConvo: Message[] = [
  {
    id: 0,
    type: "ai",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: {
      pueblo: "A village. Lorem Ipsum blah blah blah",
      gustaría: "would like",
    },
  },
  {
    id: 1,
    type: "user",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: { a: "b", c: "blah blah blah" },
  },

  {
    id: 2,
    type: "ai",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: {
      pueblo: "A village. Lorem Ipsum blah blah blah",
      gustaría: "would like",
    },
  },
  {
    id: 3,
    type: "user",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: { a: "b", c: "blah blah blah" },
  },
  {
    id: 4,
    type: "ai",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: {
      pueblo: "A village. Lorem Ipsum blah blah blah",
      gustaría: "would like",
    },
  },
  {
    id: 5,
    type: "user",
    content:
      "¿Cuál es el cambio más significativo que te gustaría ver en tu ciudad o pueblo, y cómo crees que ese cambio podría beneficiar a la comunidad?. ",
    commentary: { a: "b", c: "blah blah blah" },
  },
];

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(-1);
  const conversationRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");

  // Remove feedback panel if clicks outside
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(".speech-bubble")) {
        setSelectedId(-1);
      }
    };

    // Add click event listener to document
    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleNewTopic = async (): Promise<void> => {
    try {
      setConversation([]);
      setConversationLoading(true);
      setSelectedId(0);

      const message = await startNewTopic(selectedLanguage);
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

  const handleSubmitAnswer = async (text: string) => {
    // add human response to conversation
    let lastId = getLastIdInConversation();
    let userMessage: Message = {
      id: lastId + 1,
      type: "user",
      content: text,
      commentary: null,
    };

    let ConversationWithUserAnswer = [...conversation, userMessage];

    setConversation(ConversationWithUserAnswer);
    setConversationLoading(true);

    // get AI response
    const AIResponse = await getAIResponse(
      ConversationWithUserAnswer,
      selectedLanguage
    );

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

  useEffect((): void => {
    setConversation(dummyConvo);
  }, []);
  // useEffect((): void => {
  //   handleNewTopic();
  // }, []);

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
                  <div className="leftside-panel">
                    <div className="leftside-panel-conversation">
                      <ConversationPanel
                        conversation={conversation}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        ref={conversationRef}
                      ></ConversationPanel>
                      <div>{conversationLoading && <Loader />}</div>
                    </div>
                    <div className="leftside-panel-textsubmit">
                      <TextSubmitBox
                        OnSubmitAnswer={handleSubmitAnswer}
                      ></TextSubmitBox>
                    </div>
                  </div>
                  <div className="rightside-panel">
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
