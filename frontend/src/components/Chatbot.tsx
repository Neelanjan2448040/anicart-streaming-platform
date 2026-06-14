import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hi there! I am Binge Sensei, your personal anime guru. What kind of anime are you looking for?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error("Error communicating with Binge Sensei:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Oops! My connection to the spirit world was interrupted. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white shadow-2xl shadow-pink-500/50 flex items-center justify-center text-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg">🤖 Binge Sensei</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-[#0a0a0a]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-pink-600 text-white self-end rounded-br-none' : 'bg-gray-800 text-gray-200 self-start rounded-bl-none border border-gray-700'}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl self-start rounded-bl-none text-sm border border-gray-700 italic">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gray-900 border-t border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Binge Sensei..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-pink-600 rounded-full text-white flex items-center justify-center hover:bg-pink-500 disabled:opacity-50 transition-colors"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
