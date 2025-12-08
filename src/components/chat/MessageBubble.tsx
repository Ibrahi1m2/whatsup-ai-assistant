import { Message } from "@/types/chat";
import { Check, CheckCheck, Mic, ImageIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const timeString = format(message.timestamp, "HH:mm");

  const handleDownloadImage = () => {
    if (message.image) {
      const link = document.createElement("a");
      link.href = message.image;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className={cn(
        "flex message-appear",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[85%] sm:max-w-[70%] px-3 py-2 rounded-lg shadow-sm",
          isUser
            ? "bg-chat-message-out rounded-tr-sm"
            : "bg-chat-message-in rounded-tl-sm"
        )}
      >
        {/* Message type indicator */}
        {message.type === "voice" && (
          <div className="flex items-center gap-2 mb-1">
            <Mic className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground">Voice message</span>
          </div>
        )}

        {/* Image content */}
        {message.image && (
          <div className="relative mb-2 rounded-lg overflow-hidden group">
            <img
              src={message.image}
              alt="AI Generated"
              className="max-w-full h-auto rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDownloadImage}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        )}

        {/* Text content */}
        <p className="text-sm text-foreground whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
          {message.isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse rounded-sm" />
          )}
        </p>

        {/* Timestamp and status */}
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <span className="text-[10px] text-muted-foreground">{timeString}</span>
          {isUser && (
            <CheckCheck className="w-3.5 h-3.5 text-primary" />
          )}
        </div>

        {/* Bubble tail */}
        <div
          className={cn(
            "absolute top-0 w-3 h-3 overflow-hidden",
            isUser ? "-right-1.5" : "-left-1.5"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rotate-45 transform origin-bottom-left",
              isUser ? "bg-chat-message-out" : "bg-chat-message-in"
            )}
          />
        </div>
      </div>
    </div>
  );
};