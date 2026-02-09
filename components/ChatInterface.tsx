import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingBag, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50/50 backdrop-blur">
        <Sparkles size={18} className="text-amber-500" />
        <h3 className="font-semibold text-neutral-900">LUMA Design Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-neutral-400 mt-12">
            <p className="mb-2">👋 Hi! I'm your design assistant.</p>
            <p className="text-sm">Ask me to tweak the design or find furniture items!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`
                max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-neutral-900 text-white rounded-tr-sm' 
                  : 'bg-neutral-100 text-neutral-800 rounded-tl-sm'}
              `}
            >
              {msg.text}
            </div>

            {/* Product Suggestions */}
            {msg.products && msg.products.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[85%]">
                {msg.products.map((product, idx) => (
                  <a
                    key={idx}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-[10px] text-neutral-500 truncate">
                        {product.source}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-neutral-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Suggest a blue rug..."
            className="w-full pl-4 pr-12 py-3 bg-neutral-50 border-transparent focus:bg-white border focus:border-neutral-300 rounded-xl outline-none text-sm transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
