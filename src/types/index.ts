
export interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: number;
}

// Add WebkitSpeechRecognition interface for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
