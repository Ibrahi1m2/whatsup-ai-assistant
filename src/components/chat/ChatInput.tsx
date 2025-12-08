import { useState, useRef, useEffect } from "react";
import { Send, Mic, Image, Smile, Paperclip, X, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

interface ChatInputProps {
  onSendMessage: (content: string, type?: "text" | "image") => void;
  onSendVoice: (blob: Blob) => void;
  onStopGeneration: () => void;
  isLoading: boolean;
  isGenerating: boolean;
}

export const ChatInput = ({
  onSendMessage,
  onSendVoice,
  onStopGeneration,
  isLoading,
  isGenerating,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useVoiceRecorder(onSendVoice);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isRecording) {
    return (
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={cancelRecording}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-destructive pulse-ring" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Recording... {formatDuration(recordingDuration)}
            </span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${Math.min((recordingDuration % 30) / 30 * 100, 100)}%` }}
              />
            </div>
          </div>

          <Button
            onClick={stopRecording}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-2 bg-card border-t border-border">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <Smile className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            disabled={isLoading}
            className={cn(
              "w-full resize-none rounded-2xl border border-input bg-secondary/50 px-4 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "scrollbar-thin transition-all",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>

        {isGenerating ? (
          <Button
            onClick={onStopGeneration}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full w-10 h-10 shrink-0"
          >
            <Square className="w-4 h-4" />
          </Button>
        ) : message.trim() ? (
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={startRecording}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 shrink-0"
          >
            <Mic className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Quick action hints */}
      <div className="flex items-center gap-2 mt-2 px-2">
        <span className="text-[10px] text-muted-foreground">Try:</span>
        <button
          onClick={() => onSendMessage("Generate an image of a sunset over mountains")}
          className="text-[10px] text-primary hover:text-primary/80 hover:underline"
        >
          🎨 Generate image
        </button>
        <span className="text-muted-foreground text-[10px]">•</span>
        <button
          onClick={() => onSendMessage("What can you help me with?")}
          className="text-[10px] text-primary hover:text-primary/80 hover:underline"
        >
          💡 Ask anything
        </button>
      </div>
    </div>
  );
};