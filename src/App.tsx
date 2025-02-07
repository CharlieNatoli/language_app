import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import TitleBar from "./components/TitleBar";

function App() {


  const handleSelectItem = (animal: string) => {
    console.log(animal);
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
  }
`;

  return <>   
  <style>{styles}</style>
    <div className="full-page">
    <TitleBar></TitleBar>
    <div className="outer-container">
    <div className="conversation-panel">
    <ConversationPanel></ConversationPanel>
  </div>
  <div className="content-panel">
    
  <FeedbackPanel >
    </FeedbackPanel>
  </div>
  </div>
  </div>
  </>  
    ;
}

export default App;
