import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import { sendMessage } from './api';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const chatScrollRef = useRef(null);

  const prevMessageCount = useRef(0);
  const isSendingMessage = useRef(false);
  const isSwitchingChat = useRef(false);

  useEffect(() => {
    if (
      !isSwitchingChat.current &&
      isSendingMessage.current &&
      messages.length > prevMessageCount.current
    ) {
      const el = chatScrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      isSendingMessage.current = false;
    }
    prevMessageCount.current = messages.length;
    isSwitchingChat.current = false;
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || !activeChatId) return;

    isSendingMessage.current = true;
    isSwitchingChat.current = false;

    const updated = [
      ...messages,
      { type: 'user', content: input },
      { type: 'typing', content: 'CoreSearch is thinking...' },
    ];
    setMessages(updated);
    setInput('');

    try {
      const res = await sendMessage(activeChatId, input);
      const final = [
        ...updated.filter((m) => m.type !== 'typing'),
        { type: 'bot', content: res.reply },
      ];
      setMessages(final);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== 'typing'),
        { type: 'bot', content: '❌ Something went wrong. Try again.' },
      ]);
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <Sidebar
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setMessages={setMessages}
        isSwitchingChat={isSwitchingChat}
      />

      <div className="flex-1 relative px-4 py-6 flex flex-col items-center">
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#3a00ff] opacity-30 blur-[200px] pointer-events-none z-0" />
        <div className="absolute top-4 right-6 text-xs text-[#1a1a1a] z-10 font-mono">
          {today}
        </div>

        <div className="w-full max-w-4xl flex flex-col z-10 gap-4">
          <div className="w-full">
            <div className="flex items-center bg-[#2c2c38] rounded-full px-4 py-3 border border-[#444] shadow-md">
              <input
                type="text"
                placeholder="Ask a research question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#3a00ff] hover:bg-[#4e21ff] text-white px-5 py-2 rounded-full transition font-medium"
              >
                Send
              </button>
            </div>
          </div>

          <div
            ref={chatScrollRef}
            className="flex flex-col gap-4 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-1 text-base ${
                  msg.type === 'user' ? 'text-right self-end' : 'text-left self-start'
                }`}
              >
                {msg.type !== 'typing' && (
                  <div className="text-xs text-gray-500 mb-1">
                    {msg.type === 'user' ? 'You' : 'CoreSearch'}
                  </div>
                )}
                <p
                  className={`text-white ${
                    msg.type === 'typing'
                      ? 'italic text-sm text-gray-500'
                      : 'bg-white/5 px-3 py-2 rounded-xl inline-block max-w-[90%] backdrop-blur-sm'
                  }`}
                >
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
