
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formattedTime = format(new Date(message.timestamp), "HH:mm");

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        message.isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 relative",
          message.isAI
            ? "bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        )}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{message.text}</p>
        <span className="text-xs text-white/70 block text-right mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
