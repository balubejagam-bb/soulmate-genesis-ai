
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface Message {
  text: string;
  isAI: boolean;
}

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isAI={message.isAI}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatContainer;
