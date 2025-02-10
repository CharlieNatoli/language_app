import React from 'react';
import { AIAMessageCommentary, HumanMessageCommentary, Message } from './Message';
// import { Loader2 } from 'lucide-react';


// TODO: how to do loading state
// 

interface Feedback {
    word_choice: string,
    style: string,
    grammar: string,
}

interface FeedbackPanelProps {
    conversation: Array<Message>,
    selected_idx: number,
    isLoading?: boolean,
    isEmpty?: boolean
}

// const setFeedback {

// }

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
    conversation,
    selected_idx,
    isLoading = false,
    isEmpty = false
}) => {


    // const mockFeedback: Feedback = {
    //     word_choice: "You chose some great words. We love that for you.",
    //     style: "Style is ok. ",
    //     grammar: "Grammar is amahhhzing. You are muito bom at this.",
    // } 

    // isLoading = true
    // TODO - better spinner.
    // TODO - make this streamed instead?
    if (isLoading){
        return   <>
        <style>
          {`

            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }

            .loader {
              border: 16px solid #f3f3f3;
              border-top: 16px solid #3498db;
              border-radius: 50%;
              width: 120px;
              height: 120px;
              animation: spin 2s linear infinite;
            }
  
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div className="spinner-container">
        <div className="loader"></div></div>
      </>
    } 
     if (isEmpty) {
        return  <>
        Nothing here yet
        </>
    } 



    function commentary_str(
      conversation: Array<Message>,
      selected_idx: number
    ) {
      console.log('selectedIdx', selected_idx)
      if (conversation.length === 0 || selected_idx < 0 ) {
        return ""
      } 
      let commentary_for_resp = conversation[selected_idx].commentary
 
      if (commentary_for_resp == null) {
        return ""
    } else {
      return commentary_for_resp.toString()

    }
      
    }
    
    // First add this CSS
    return  <>  
    <div> 
      { commentary_str(conversation, selected_idx)}
        {/* <b> Word Choice</b> <br/>
        {mockFeedback.word_choice}
        <br/><br/><b> Tone</b><br/>
        {mockFeedback.style}
        <br/><br/><b>Grammar</b><br/>d
        {mockFeedback.grammar} */}
    </div>  
    </>
 
}


export default FeedbackPanel; 