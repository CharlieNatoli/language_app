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
  const [selectedId, setSelectedId] = useState(-1);
  
  useEffect(() => {
      console.log("Conversation updated:", conversation)
  }, [conversation])


  const handleStartConversation = async(event: SyntheticEvent) => {
      console.log("Clicked submit conversation button")
      setConversation([])
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
            id: 0,
            type: item.type,
            content: String(item.content),
            commentary: null
        };
 
    });
    
    setConversationLoading(false);     
    setConversation(returnMessages); 
      // TODO -loading states
  } 

  // TODO - pass data back to API 
  const getAIResponse = async(new_human_message: Message) => {
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
    let key_words = jsonData.results.key_words 
    
    // console.log("ai response to add to conversation")
    // console.log(jsonData)
    // console.log(aiResponse)

    // TOOD - lastID + 2 very hacky. Find better way
    const lastId2 = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0
    let newAIMessage: Message = {
      id: lastId2 +2,
      type: "ai",
      content: aiResponse,
      commentary: key_words
  }
    console.log('conversation',conversation)
    // let lastHumanMessageWithCommentary: Message = conversation[-1]
    
    console.log("lastHumanMessageWithCommentary", new_human_message)
    new_human_message.commentary = feedback 

    setConversation(prev => [...prev.slice(0, -1), new_human_message, newAIMessage]);
    setConversationLoading(false)
  }

  const handleSubmitAnswer = async(event: SyntheticEvent) => {
      console.log("Clicked submit answer button")
      console.log(event)

      const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0
      let newHumanMessage: Message =  {
        id: lastId +1,
        type: "user",
        content: event.target[0].value,
        commentary: null
      }

      setConversation(prev => [...prev, newHumanMessage]);
      // console.log("Current conversation state:", conversation)
      // console.log("Adding new message:", newHumanMessage)

      // setConversation(prevConversation => {
      // console.log("Previous conversation in setter:", prevConversation)
      // const newConversation = [...prevConversation, newHumanMessage];
      // console.log("New conversation state in setter:", newConversation)
      
      // After state updates and re-render, get AI response
      await getAIResponse(newHumanMessage);
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

  let selected_idx = 4


  return ( 
    <>    
    <style>{styles}</style>
    <BrowserRouter><Routes>  
      <Route path="/" element={
          
        <div className="full-page">
        <TitleBar OnStartConversation={handleStartConversation}></TitleBar>
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
