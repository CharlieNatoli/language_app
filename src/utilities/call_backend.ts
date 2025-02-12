import { Message } from "../components/Message";

interface AIResponse {
  results: {
    ai_response: string;
    feedback: string[];
    key_words: string[];
  };
}

export const startNewTopic = async (
  selectedLanguage: string
): Promise<Message> => {
  try {
    console.log("selectedLanguage", selectedLanguage);
    const response = await fetch("http://127.0.0.1:5001/new_topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ language: selectedLanguage }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    return {
      id: 0,
      type: "ai",
      content: String(jsonData.new_topic),
      commentary: jsonData.key_words,
    };
  } catch (error) {
    console.error("Failed to start new conversation:", error);
    throw error;
  }
};

export const getAIResponse = async (
  conversation: Message[],
  selectedLanguage: string
): Promise<AIResponse> => {
  console.log("selectedLanguage - response", selectedLanguage);
  try {
    const response = await fetch("http://127.0.0.1:5001/submit_answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: conversation,
        language: selectedLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to start new conversation:", error);
    throw error;
  }
};
