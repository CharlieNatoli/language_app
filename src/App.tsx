import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import TitleBar from "./components/TitleBar"; 
import Loader from "./components/Loader";

import { BrowserRouter, Routes, Route } from "react-router";
import { useState, SyntheticEvent } from "react"
import { Message, MessageType } from "./components/Message"; 

function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] = useState<boolean>(false);

  const handleStartConversation = async(event: SyntheticEvent) => {
      console.log("Clicked button")
      setConversationLoading(true)
      const response = await fetch('http://127.0.0.1:5000/new_conversation', {
          method: 'POST',
      });
      if (!response.ok) {
        setConversationLoading(false)
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();

      console.log("Got data") 
      console.log(typeof jsonData);
      console.log(jsonData)
      
      const returnMessages: Message[] = jsonData.convo.map((item: Message) => {
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

         {
        conversationLoading 
          ? <Loader /> 
          : <ConversationPanel conversation={conversation}></ConversationPanel>
      } 
        {/* <ConversationPanel conversation={conversation}></ConversationPanel> */}
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
