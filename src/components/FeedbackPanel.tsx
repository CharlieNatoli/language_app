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
      // console.log('selectedIdx', selected_idx)
      if (conversation.length === 0 || selected_idx < 0 ) {
        return ""
      } 
      let commentary_for_resp = conversation[selected_idx].commentary
 
      if (commentary_for_resp == null) {
        return ""
      }

      let commentary_type = conversation[selected_idx].type
      if (commentary_type == "ai") {
        // console.log('COMMENTARY FOR AI RESP')
        // console.log(commentary_for_resp)
        let wordsArray  = commentary_for_resp.split("\n");
        return <>
             {wordsArray.map((word: string) => ( 
            <React.Fragment key={word}>
              {word}
              <br />
            </React.Fragment>
    ))} 
        </>

      }

      if (commentary_type == "user") {

        // console.log('COMMENATRY')
        // console.log(commentary_for_resp)
 
      return <> 
      <h1>AI feedback</h1>
      <b>Grammar</b> {commentary_for_resp.grammar}<br></br>
      <b>Word Choice</b> {commentary_for_resp.word_choice} <br></br>
      <b>Style</b> {commentary_for_resp.style}
      </>
    }

    }
      
    


  const styles = ` 
  .feedback-panel { 
  background: #e6cdb8; 
  border-radius: 25px;
  min-height: 200px;
  padding: 20px;

  } ` ;

    
    // First add this CSS
    return  <>  
    <style>{styles}</style>
    <div>
    <div className="feedback-panel">   
      { commentary_str(conversation, selected_idx)}  
    </div>  
    </div>
    </>
    
  }


export default FeedbackPanel; 