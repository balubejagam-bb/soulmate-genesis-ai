
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Settings, Menu } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const ChatHeader = ({ title, isLoggedIn, onLogin }: ChatHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="p-4 border-b border-purple-500/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          SoulMate.AGI
        </h1>
      </div>
      
      <div className="flex gap-2">
        {!isLoggedIn ? (
          <Button 
            size="sm" 
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={onLogin}
          >
            <LogIn size={16} className="mr-1" />
            Login
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          >
            <Settings size={16} />
          </Button>
        )}
      </div>
      
      {menuOpen && (
        <div className="absolute top-16 left-4 bg-slate-800 border border-purple-500/20 rounded-md shadow-lg p-2 z-50">
          <div className="p-2 hover:bg-purple-500/10 rounded cursor-pointer">
            New Chat
          </div>
          <div className="p-2 hover:bg-purple-500/10 rounded cursor-pointer">
            Chat History
          </div>
          <div className="p-2 hover:bg-purple-500/10 rounded cursor-pointer">
            Settings
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
