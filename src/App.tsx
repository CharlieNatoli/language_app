import ConversationPanel from "./components/ConversationPanel";
import FeedbackPanel from "./components/FeedbackPanel";

function App() {


  const handleSelectItem = (animal: string) => {
    console.log(animal);
  }


  let animals_base = [
    'Cat',
    'Dog',
    'Swan',
    'Canada Goose',
    'Capy',
    'Penguin'
]

  return <div>    
 
      
    <div style={{ display: 'flex', minHeight: '100vh' }}>
    <div style={{ flex: 1, padding: '40px', backgroundColor: '#f8f9fa' }}>
    <ConversationPanel></ConversationPanel>
  </div>
  <div style={{ flex: 1, padding: '40px', backgroundColor: '#e9ecef' }} className="overflow-y-auto">
    
  <FeedbackPanel>
    </FeedbackPanel>
  </div>
  </div>  
  </div>  
    ;
}

export default App;
