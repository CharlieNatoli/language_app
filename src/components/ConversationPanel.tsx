import React, { useState } from 'react';
import { User, Bot } from 'lucide-react';
import TextSubmitBox from './TextSubmitBox'


type MessageType = 'user' | 'ai';

interface SpeechBubbleProps {
    type: MessageType;
    message: string;
    isSelected: boolean;
    onSelect: () => void;
  }

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  type = 'user',
  message = '',
  isSelected = false,
  onSelect = () => {}
}) => {
  // Base styles for the speech bubble
  const bubbleStyle = {
    display: 'flex', 
    alignItems: 'center',
    padding: '5px',
    borderRadius: '1rem', 
    cursor: 'pointer',
    backgroundColor: type === 'user' ? '#3B82F6' : '#DBEAFE',
    color: type === 'user' ? '#FFFFFF' : '#1F2937',
    marginLeft: type === 'user' ? 'auto' : '0',
    ...(isSelected && {
      boxShadow: '0 0 0 2px #2563EB, 0 0 0 4px #FFFFFF'
    })
  };

  // Icon container styles
  const iconStyle = { 
    right: '1rem' ,
    left: '1rem' 
    // ...(type === 'user' ? { right: '1rem' } : { left: '1rem' })
  };

  // Icon styles
  const iconComponentStyle = {
    width: '1.25rem',
    height: '1.25rem',
    padding: '1px'

  };

  // Content container styles
  const contentStyle = {
    textAlign: 'left' 
    // ...(type === 'user' ? { paddingRight: '2rem' } : { paddingLeft: '2rem' })
  };

  // Message text styles
  const messageStyle = {
    fontSize: '0.875rem',
    // lineHeight: '1.625',
    marginLeft: '1rem',
    marginRight: '1rem'
  };

  // Wrapper styles for width control
  const wrapperStyle = {
    padding: '5px', 
    paddingRight: type === 'ai' ? '30px' as const : '' as const,
    paddingLeft: type === 'ai' ? '' as const : '30px' as const,
  };

  const IconComponent = type === 'user' ? User : Bot;
  // TODO - why is there the extra line at the bottom?
  // TODO - cleaner way to have if statement here / all these settings??
  return (
    <div style={wrapperStyle}> 
        { type == 'user' ? (

      <div style={bubbleStyle} onClick={onSelect}>  
      <div style={contentStyle}>
        <p style={messageStyle}>
          {message}
        </p>
      </div>
        <div style={iconStyle}>
        <IconComponent style={iconComponentStyle} />
      </div>
      </div>

        ) : (

          <div style={bubbleStyle} onClick={onSelect}> 

      <div style={iconStyle}>
          <IconComponent style={iconComponentStyle} />
        </div> 
          <div style={contentStyle}>
            <p style={messageStyle}>
              {message}
            </p>
          </div> 
        </div>

        )} 
 
      </div>
  );
};

interface Message {
    id: number;
    type: MessageType;
    content: string;
  }

// Example message data
const exampleMessages = [
  {
    id: 1,
    type: 'ai' as MessageType,
    content: "Hola. Dime mas sobre tus comidas favoritas? Que te gusta mas y porque? "
  },
  {
    id: 2,
    type: 'user' as MessageType,
    content: "I'd be happy to help you understand how to implement a classification model. Let's break this down into manageable steps and explore the key concepts you'll need to know."
  },
  // {
  //   id: 3,
  //   type: 'ai' as MessageType,
  //   content: "Let's break this down into manageable steps and explore the key concepts you'll need to know."

  // },
  // {
  //   id: 4,
  //   type: 'user' as MessageType,
  //   content: "I'd be happy to help you understand how to implement a classification model. "
  // },
  // {
  //   id: 5,
  //   type: 'ai' as MessageType,
  //   content: "I'd be happy to help you understand how to implement a classification model. Let's break this down into manageable steps and explore the key concepts you'll need to know."
  // },
  // {
  //   id: 6,
  //   type: 'user' as MessageType,
  //   content: "I'd be happy to help you understand how to implement a classification model. "
  // }
];

const exampleMessages2 = exampleMessages.map((message) => {
  let msg_id  = message.id + exampleMessages.length;
  return {
    id: msg_id,
    type: message.type,
    content: message.content
  };
})


// The main Example component that we'll export as default
const ConversationPanel = () => {
    const [selectedId, setSelectedId] = React.useState(-1);

  
  return (
    // Outer container for page margins
    <div className="min-h-screen">
      {/* Inner container for content width */} 
      <div className="w-3/5 mx-auto p-4">
        <div className="h-96 overflow-y-auto space-y-8">  
          {exampleMessages.concat(exampleMessages2).map((message) => (
            <SpeechBubble
              key={message.id}
              type={message.type}
              message={message.content}
              isSelected={selectedId === message.id}
              onSelect={() => setSelectedId(message.id)}
            />
          ))} 
          <TextSubmitBox/>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
