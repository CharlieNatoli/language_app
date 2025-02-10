import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import TitleBar from "./components/TitleBar"; 
import Loader from "./components/Loader";
import TextSubmitBox from "./components/TextSubmitBox";

import { BrowserRouter, Routes, Route } from "react-router";
import { useState, SyntheticEvent, useEffect } from "react"
import { Message, MessageType } from "./components/Message"; 

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] = useState<boolean>(false); 
  
  useEffect(() => {
      console.log("Conversation updated:", conversation)
  }, [conversation])


  const handleStartConversation = async(event: SyntheticEvent) => {
      console.log("Clicked submit conversation button")
      setConversationLoading(true)
      const response = await fetch('http://127.0.0.1:5000/new_conversation', {
          method: 'POST',
      });
      if (!response.ok) {
        setConversationLoading(false)
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();

      const returnMessages: Message[] = jsonData.new_conversation.map((item: Message) => {
        if (!item.id || !item.type || !item.content) {
            throw new Error('Invalid message format');
        }
        return {
            id: Number(item.id),
            type: item.type,
            content: String(item.content)
        };
 
    });
    
    setConversationLoading(false);     
    setConversation(returnMessages); 
      // TODO -loading states
  } 

  const getAIResponse =async() => {
    setConversationLoading(true)
    const response = await fetch('http://127.0.0.1:5000/add_response', {
        method: 'POST',
    });
    if (!response.ok) {
      setConversationLoading(false)
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    let aiResponse = jsonData.results.ai_response
    let feedback = jsonData.results.feedback 


    console.log("ai response to add to conversation")
    console.log(jsonData)
    console.log(aiResponse)

    const lastId2 = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0
    let newAIMessage: Message = 
    {
      id: lastId2 +2,
      type: "ai",
      content: aiResponse
  }
      setConversation(prev => [...prev, newAIMessage]);
      setConversationLoading(false)

  }

  const handleSubmitAnswer =async(event: SyntheticEvent) => {
      console.log("Clicked submit answer button")

      const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0
      let newHumanMessage: Message =  {
        id: lastId +1,
        type: "user",
        content: "meow meow "
      }

      setConversation(prev => [...prev, newHumanMessage]);
      // console.log("Current conversation state:", conversation)
      // console.log("Adding new message:", newHumanMessage)

      // setConversation(prevConversation => {
      // console.log("Previous conversation in setter:", prevConversation)
      // const newConversation = [...prevConversation, newHumanMessage];
      // console.log("New conversation state in setter:", newConversation)
      
      // After state updates and re-render, get AI response
      await getAIResponse();
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
  }`
  ;


  return ( 
    <>    
    <style>{styles}</style>
    <BrowserRouter><Routes>  
      <Route path="/" element={
          
        <div className="full-page">
        <TitleBar OnStartConversation={handleStartConversation}></TitleBar>
        <div className="outer-container">
        <div className="conversation-panel"> 
        <ConversationPanel conversation={conversation}></ConversationPanel>

         {
        conversationLoading 
          ? <Loader /> 
          :  <></>
      } 
       <TextSubmitBox OnSubmitAnswer={handleSubmitAnswer}></TextSubmitBox>
      </div>
      <div className="content-panel">
        
      <FeedbackPanel >
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
