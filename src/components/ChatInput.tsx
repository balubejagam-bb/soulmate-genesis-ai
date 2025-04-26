import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Mic, Paperclip } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now."
      });
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(prev => prev + transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive"
      });
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-t border-purple-500/20">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-slate-800/50 border-purple-500/20 focus-visible:ring-purple-500/50"
        disabled={isLoading}
      />
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10",
          isListening && "bg-purple-500/30"
        )}
        onClick={startListening}
        disabled={isLoading}
      >
        <Mic className="h-4 w-4" />
      </Button>
      
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !message.trim()}
        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
