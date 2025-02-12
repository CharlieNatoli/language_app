import { useState } from "react";
import { Message } from "../components/Message";
import { getAIResponse, startNewTopic } from "../services/call_backend";

export const useConversation = (selectedLanguage: string) => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationLoading, setConversationLoading] = useState(false);

  const handleNewTopic = async () => {
    try {
      setConversation([]);
      setConversationLoading(true);
      const message = await startNewTopic(selectedLanguage);
      setConversation([message]);
    } catch (error) {
      console.error("Failed to start new topic:", error);
      // Add error handling
    } finally {
      setConversationLoading(false);
    }
  };

  const handleSubmitAnswer = async (text: string) => {
    const lastId = conversation.length > 0 ? conversation.at(-1)?.id ?? 0 : 0;
    const userMessage: Message = {
      id: lastId + 1,
      type: "user",
      content: text,
      commentary: null,
    };

    let ConversationWithUserAnswer = [...conversation, userMessage];
    setConversation(ConversationWithUserAnswer);
    setConversationLoading(true);

    // get AI response
    let AIResponse = await getAIResponse(
      ConversationWithUserAnswer,
      selectedLanguage
    );

    // update conversation post-AI response
    let newAIMessage: Message = {
      id: lastId + 2,
      type: "ai",
      content: AIResponse.results.ai_response,
      commentary: AIResponse.results.key_words,
    };

    let userMessageWithCommentary = {
      ...userMessage,
      commentary: AIResponse.results.feedback,
    };

    setConversation([
      ...ConversationWithUserAnswer.slice(0, -1),
      userMessageWithCommentary,
      newAIMessage,
    ]);
    setConversationLoading(false);
  };

  return {
    conversation,
    conversationLoading,
    handleNewTopic,
    handleSubmitAnswer,
  };
};
