
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import ChatHeader from "@/components/ChatHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/types";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: uuidv4(),
      text: "Hi! I'm your AI companion. How can I help you today?", 
      isAI: true,
      timestamp: Date.now()
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('GOOGLE_API_KEY') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!apiKey);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("New Chat");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      try {
        const parsedHistory = JSON.parse(storedChatHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("Error parsing chat history:", error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 1) { // Only save if we have more than the initial greeting
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

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

    // Create a new message object
    const newUserMessage: Message = {
      id: uuidv4(),
      text: message,
      isAI: false,
      timestamp: Date.now()
    };

    // Add user message to chat
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Create context from previous messages for more personalized responses
      const recentMessages = messages.slice(-5).map(m => ({
        role: m.isAI ? "assistant" : "user",
        content: m.text
      }));
      
      const conversationContext = [
        ...recentMessages,
        { role: "user", content: message }
      ];

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: conversationContext.map(msg => ({ 
            role: msg.role,
            parts: [{ text: msg.content }]
          })),
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
          }
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      
      const newAIMessage: Message = {
        id: uuidv4(),
        text: aiResponse,
        isAI: true,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          id: uuidv4(),
          text: "Sorry, I encountered an error. Please try again.", 
          isAI: true,
          timestamp: Date.now()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Temporary login function (to be replaced with Supabase auth)
  const handleLogin = () => {
    setIsLoggedIn(true);
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
      <ChatHeader 
        title={sessionTitle} 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin}
      />
      <ChatContainer messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Index;
