import { useState, useCallback, useRef } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (content: string, type: "text" | "image" = "text") => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
      type: type === "image" ? "image" : "text",
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Check if this is an image generation request
    const isImageRequest = /generate|create|draw|make|show me|picture of|image of/i.test(content) && 
                          /image|picture|photo|illustration|art|drawing/i.test(content);

    try {
      if (isImageRequest || type === "image") {
        // Non-streaming image generation
        const { data, error } = await supabase.functions.invoke("chat", {
          body: { 
            messages: [{ role: "user", content }],
            type: "image",
            imagePrompt: content
          }
        });

        if (error) throw error;

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.content || "Here's the image I created!",
          timestamp: new Date(),
          type: "image",
          image: data.image,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Streaming text response
        abortControllerRef.current = new AbortController();

        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: messages.concat(userMessage).map(m => ({
              role: m.role,
              content: m.content,
            })),
            type: "text",
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 429) {
            toast.error("Rate limit exceeded. Please wait a moment.");
            throw new Error("Rate limit exceeded");
          }
          if (response.status === 402) {
            toast.error("Please add credits to continue.");
            throw new Error("Payment required");
          }
          throw new Error(errorData.error || "Failed to get response");
        }

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        let assistantMessageId = generateId();

        // Add initial streaming message
        setMessages(prev => [...prev, {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          type: "text",
          isStreaming: true,
        }]);

        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantContent += content;
                setMessages(prev => prev.map(m => 
                  m.id === assistantMessageId 
                    ? { ...m, content: assistantContent }
                    : m
                ));
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }

        // Mark streaming as complete
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId 
            ? { ...m, isStreaming: false }
            : m
        ));
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted");
        return;
      }
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages]);

  const sendVoiceMessage = useCallback(async (audioBlob: Blob) => {
    setIsLoading(true);

    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 0x8000;
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      
      const base64Audio = btoa(binary);

      // Transcribe audio
      const { data: transcriptionData, error: transcriptionError } = await supabase.functions.invoke("voice-to-text", {
        body: { audio: base64Audio }
      });

      if (transcriptionError) throw transcriptionError;

      const transcribedText = transcriptionData.text || "";
      
      if (transcribedText) {
        // Add voice message from user
        const userMessage: Message = {
          id: generateId(),
          role: "user",
          content: transcribedText,
          timestamp: new Date(),
          type: "voice",
        };

        setMessages(prev => [...prev, userMessage]);

        // Send to AI
        await sendMessage(transcribedText);
      } else {
        toast.error("Could not transcribe audio. Please try again.");
      }
    } catch (error) {
      console.error("Voice message error:", error);
      toast.error("Failed to process voice message.");
    } finally {
      setIsLoading(false);
    }
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    sendVoiceMessage,
    clearMessages,
    stopGeneration,
  };
};