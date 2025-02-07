import React from 'react';
// import { Loader2 } from 'lucide-react';


// TODO: how to do loading state
// 

interface Feedback {
    word_choice: string,
    style: string,
    grammar: string,
}

interface FeedbackPanelProps {
    feedback?: Feedback,
    isLoading?: boolean,
    isEmpty?: boolean
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
    feedback,
    isLoading = false,
    isEmpty = false
}) => {


    const mockFeedback: Feedback = {
        word_choice: "You chose some great words. We love that for you.",
        style: "Style is ok. ",
        grammar: "Grammar is amahhhzing. You are muito bom at this.",

    } 

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
    // First add this CSS
    return  <>  
    <div> 
        <b> Word Choice</b> <br/>
        {mockFeedback.word_choice}
        <br/><br/><b> Tone</b><br/>
        {mockFeedback.style}
        <br/><br/><b>Grammar</b><br/>
        {mockFeedback.grammar}
    </div>  
    </>
 
}


export default FeedbackPanel; 