
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

const ChatMessage = ({ message, isAI }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isAI
            ? "bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        )}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
