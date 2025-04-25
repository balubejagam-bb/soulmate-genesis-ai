
import { useState, useEffect } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  isAI: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI companion. How can I help you today?", isAI: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('GOOGLE_API_KEY') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!apiKey);

  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('GOOGLE_API_KEY', apiKey);
      setIsApiKeyModalOpen(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    // Add user message to chat
    setMessages((prev) => [...prev, { text: message, isAI: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      
      setMessages((prev) => [
        ...prev,
        { text: aiResponse, isAI: true },
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
    <div className="flex flex-col h-[100dvh] max-w-2xl mx-auto bg-gradient-to-b from-slate-900 to-slate-800">
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 text-purple-500">Enter Google API Key</h2>
            <Input 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Google API key here"
              className="mb-4"
            />
            <Button onClick={saveApiKey} className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              Save API Key
            </Button>
          </div>
        </div>
      )}
      <header className="p-4 border-b border-purple-500/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          SoulMate.AGI
        </h1>
      </header>
      <ChatContainer messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Index;
