
export interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: number;
}

// Add both standard and webkit SpeechRecognition interfaces for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

// For storing chat history per user
export interface UserChatHistory {
  userId: string;
  messages: Message[];
  lastUpdated: number;
}
