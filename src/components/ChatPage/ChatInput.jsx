import React, { useState } from "react";
import { Send , SendHorizonal} from 'lucide-react';

export const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-slate-800/30 backdrop-blur-xl ">
      <div className="max-w-2xl mx-auto flex space-x-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "Reconectando..." : "Escribe tú mensaje ..."}
          className="flex-1 bg-slate-800/50 border border-cyan-400/10 rounded-lg px-4 py-[9px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30 outline-none"
          disabled={disabled}
        />
        <button 
          type="submit"
          className={`bg-cyan-400 text-slate-900 p-2 px-[12px] rounded-3xl ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-400/90'
          }`}
          disabled={disabled}
        >
          <SendHorizonal className="h-[20px] w-[20px]" />
        </button>
      </div>
    </form>
  );
};