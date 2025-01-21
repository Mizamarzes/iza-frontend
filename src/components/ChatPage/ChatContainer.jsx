import React, { useEffect, useState } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { wsService } from "../../services/wssChatService";
import { useChat } from "../../context/ChatContext";
import { DEFAULT_MESSAGES } from "../../constants/chatMessages";

export const ChatContainer = () => {
  const { messages, setMessages, isInputEnabled } = useChat();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = wsService.connect();

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Conexión WebSocket establecida");
    };

    const handleMessage = (data) => {
      try {
        // Si es string lo usamos directamente, si no, intentamos acceder al mensaje
        const messageContent = typeof data === 'string' ? data : data.message;

        setMessages(prev => [...prev, {
          id: Date.now(),
          avatar: 'C',
          message: messageContent,
          isAI: true
        }]);

      } catch (error) {
        console.error("Error al procesar mensaje:", error);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
      wsService.disconnect();
    };
  }, []);

  const handleSendMessage = (message) => {
    if (!message.trim() || !isConnected || !isInputEnabled) return;

    const userName = localStorage.getItem('userName');
    const userCity = localStorage.getItem('userCity');

    // Agregar mensaje del usuario al chat
    setMessages(prev => [...prev, {
      id: Date.now(),
      avatar: "U",
      message: message,
      isAI: false,
    }]);

    // Enviar mensaje al WebSocket
    const fullMessage = {
      type: "message",
      message: `Mi nombre es: ${userName} y mi pregunta es: ${message}`,
      city: userCity,
    };

    try {
      wsService.sendMessage(fullMessage);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);

      setMessages(prev => [...prev, {
        id: Date.now(),
        avatar: "C",
        message: "Lo siento, hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
        isAI: true,
        isError: true
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList />
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={!isConnected}
      />
    </div>
  );
};
