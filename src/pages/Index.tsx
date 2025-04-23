
import { useState } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";

interface Message {
  text: string;
  isAI: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI companion. How can I help you today?", isAI: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages((prev) => [...prev, { text: message, isAI: false }]);
    setIsLoading(true);

    try {
      // Placeholder for API call to Gemini
      // This will be implemented once the API key is properly set up
      setMessages((prev) => [
        ...prev,
        { text: "This is a placeholder response. To enable AI responses, please add your Google API key.", isAI: true },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error. Please try again.", isAI: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-2xl mx-auto">
      <header className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-2xl font-bold text-center">SoulMate.AGI</h1>
      </header>
      <ChatContainer messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Index;
