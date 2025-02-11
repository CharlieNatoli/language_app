import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import TitleBar from "./components/TitleBar"; 
import Loader from "./components/Loader";
import TextSubmitBox from "./components/TextSubmitBox";


import { BrowserRouter, Routes, Route } from "react-router";
import  { useState, SyntheticEvent, useEffect } from "react"
import { Message, MessageType } from "./components/Message"; 

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] = useState<boolean>(false); 
  // setSelectedId vs setSelectedIdx
  const [selectedId, setSelectedId] = useState(-1);
  
  useEffect(() => {
      console.log("Conversation updated:", conversation)
  }, [conversation])


  const handleStartConversation = async(event: SyntheticEvent) => {
      // console.log("Clicked submit conversation button")
      setConversation([])
      setConversationLoading(true)
      setSelectedId(0)
      const response = await fetch('http://127.0.0.1:5000/new_conversation', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      });

      if (!response.ok) {
        setConversationLoading(false)
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();

      const message: Message = {
        id: 0,
        type: "ai",
        content: String(jsonData.new_conversation),
        commentary: jsonData.key_words
    }; 

    console.log('MESSAGE')
    console.log(message)
    console.log('NEW WORDSS')
    console.log( jsonData.key_words)
    
    setConversationLoading(false);     
    setConversation([message]); 
      // TODO -loading states
  } 


  const getAIResponse = async(newConversation: [Message]) => {
    setConversationLoading(true) 
    
    const response = await fetch('http://127.0.0.1:5000/continue_conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json',
        },
        body: JSON.stringify({conversation: newConversation}),
    });
    if (!response.ok) {
      setConversationLoading(false)
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    let aiResponse = jsonData.results.ai_response
    let feedback = jsonData.results.feedback 
    let key_words = jsonData.results.key_words 
    
    // TOOD - lastID + 2 very hacky. Find better way
    const lastId2 = newConversation.length > 0 ? newConversation.at(-1)?.id ?? 0 : 0
    let newAIMessage: Message = {
      id: lastId2 +1,
      type: "ai",
      content: aiResponse,
      commentary: key_words
  } 

    let new_human_message = newConversation[newConversation.length - 1]
    new_human_message.commentary = feedback 

    let newConversationWithAIFeedback = [...newConversation.slice(0, -1), new_human_message, newAIMessage]


    // console.log("NEW CONVERSATION WITH AI ANSWER AND HUMAN FEEDBACK ADDED")
    // console.log(newConversationWithAIFeedback)

    setConversation(newConversationWithAIFeedback) 
    setConversationLoading(false)

  } 

  const addHumanAnswer = async(event: SyntheticEvent) => {

    const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0
    let newHumanMessage: Message =  {
      id: lastId + 1,
      type: "user",
      content: event.target[0].value,
      commentary: null
    }

    let ConversationWithHumanAnswer = [...conversation, newHumanMessage]

    setConversation(ConversationWithHumanAnswer);

    return ConversationWithHumanAnswer

  }

  const handleSubmitAnswer = async(event: SyntheticEvent) => {
      // After state updates and re-render, get AI response
       
      let ConversationWithHumanAnswer = await addHumanAnswer(event)

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

  let selected_idx = 4


  return ( 
    <>    
    <style>{styles}</style>
    <BrowserRouter><Routes>  
      <Route path="/" element={
          
        <div className="full-page">
        <TitleBar 
        OnStartConversation={handleStartConversation}  
        ></TitleBar>
        <div className="outer-container">
        <div className="conversation-panel"> 
        <ConversationPanel 
          conversation={conversation}
          selectedId={selectedId} 
          setSelectedId={setSelectedId}
          ></ConversationPanel>

         {
        conversationLoading 
          ? <Loader /> 
          :  <></>
      } 
       <TextSubmitBox OnSubmitAnswer={handleSubmitAnswer}></TextSubmitBox>
      </div>
      <div className="content-panel">
        
      <FeedbackPanel conversation={conversation} selected_idx={selectedId}>
      </FeedbackPanel>
      </div>
      </div>
      </div>  
        } />
    </Routes>
  </BrowserRouter> 
  </>  
  )
    ;
}

export default App;
