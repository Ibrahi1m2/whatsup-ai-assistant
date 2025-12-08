import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { MessageSquare, Sparkles } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 chat-pattern">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-whatsapp-teal flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Welcome to AI Agent
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            I can help you with questions, generate images, and more. 
            Type a message or use voice to get started!
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <span className="text-lg mb-1 block">💬</span>
              <p className="text-xs text-foreground font-medium">Chat</p>
              <p className="text-[10px] text-muted-foreground">Ask me anything</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <span className="text-lg mb-1 block">🎨</span>
              <p className="text-xs text-foreground font-medium">Images</p>
              <p className="text-[10px] text-muted-foreground">Generate visuals</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <span className="text-lg mb-1 block">🎤</span>
              <p className="text-xs text-foreground font-medium">Voice</p>
              <p className="text-[10px] text-muted-foreground">Talk to me</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <span className="text-lg mb-1 block">🧠</span>
              <p className="text-xs text-foreground font-medium">Memory</p>
              <p className="text-[10px] text-muted-foreground">Context aware</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-pattern scrollbar-thin"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isLoading && !messages.some(m => m.isStreaming) && (
        <TypingIndicator />
      )}
      
      <div ref={bottomRef} />
    </div>
  );
};