import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessages } from "./chat/ChatMessages";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export const WhatsAppChat = () => {
  const {
    messages,
    isLoading,
    sendMessage,
    sendVoiceMessage,
    clearMessages,
    stopGeneration,
  } = useChat();

  const isGenerating = messages.some(m => m.isStreaming);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      <ChatHeader onClearChat={clearMessages} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        onSendMessage={sendMessage}
        onSendVoice={sendVoiceMessage}
        onStopGeneration={stopGeneration}
        isLoading={isLoading}
        isGenerating={isGenerating}
      />
    </div>
  );
};