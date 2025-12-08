export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type: "text" | "voice" | "image";
  image?: string;
  audioUrl?: string;
  isStreaming?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isRecording: boolean;
  error: string | null;
}