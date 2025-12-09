import { useState, useRef, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RealtimeChat } from "@/utils/RealtimeAudio";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceCallModal = ({ isOpen, onClose }: VoiceCallModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const chatRef = useRef<RealtimeChat | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      startCall();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isConnected) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConnected]);

  const handleMessage = (event: any) => {
    switch (event.type) {
      case 'response.audio.delta':
        setIsSpeaking(true);
        break;
      case 'response.audio.done':
      case 'response.done':
        setIsSpeaking(false);
        break;
      case 'error':
        console.error('Realtime error:', event);
        toast.error('Voice call error occurred');
        break;
    }
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
    setIsConnecting(false);
    if (connected) {
      toast.success('Connected to AI');
    }
  };

  const startCall = async () => {
    try {
      setIsConnecting(true);
      chatRef.current = new RealtimeChat(handleMessage, handleConnectionChange);
      await chatRef.current.init();
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsConnecting(false);
      toast.error(error instanceof Error ? error.message : 'Failed to connect');
    }
  };

  const endCall = () => {
    chatRef.current?.disconnect();
    chatRef.current = null;
    setIsConnected(false);
    setIsSpeaking(false);
    onClose();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && endCall()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            Voice Call with AI
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-8 gap-6">
          {/* Avatar with speaking animation */}
          <div className="relative">
            <div 
              className={cn(
                "w-24 h-24 rounded-full bg-gradient-to-br from-primary to-whatsapp-teal flex items-center justify-center transition-all duration-300",
                isSpeaking && "ring-4 ring-primary/50 ring-offset-2 ring-offset-card animate-pulse"
              )}
            >
              <Volume2 className={cn(
                "w-10 h-10 text-primary-foreground transition-opacity",
                isSpeaking ? "opacity-100" : "opacity-50"
              )} />
            </div>
            
            {/* Speaking indicator rings */}
            {isSpeaking && (
              <>
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary animate-ping opacity-30" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-primary animate-pulse opacity-50" />
              </>
            )}
          </div>

          {/* Status text */}
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">
              {isConnecting ? "Connecting..." : isConnected ? "AI Agent" : "Disconnected"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isConnecting 
                ? "Setting up voice connection"
                : isConnected 
                  ? isSpeaking 
                    ? "Speaking..." 
                    : "Listening..."
                  : "Call ended"
              }
            </p>
            {isConnected && (
              <p className="text-xs text-muted-foreground mt-1">
                {formatDuration(callDuration)}
              </p>
            )}
          </div>

          {/* Call controls */}
          <div className="flex items-center gap-4">
            {isConnected && (
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full"
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}

            <Button
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>

          {isConnecting && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
