export const TypingIndicator = () => {
  return (
    <div className="flex justify-start message-appear">
      <div className="bg-chat-message-in px-4 py-3 rounded-lg rounded-tl-sm relative">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
        </div>
        
        {/* Bubble tail */}
        <div className="absolute top-0 -left-1.5 w-3 h-3 overflow-hidden">
          <div className="w-4 h-4 bg-chat-message-in rotate-45 transform origin-bottom-left" />
        </div>
      </div>
    </div>
  );
};