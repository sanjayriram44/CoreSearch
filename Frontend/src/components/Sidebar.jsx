import { useEffect, useState } from 'react';
import { getChats, createChat, deleteChat } from '../api';

const Sidebar = ({
  activeChatId,
  setActiveChatId,
  setMessages,
  isSwitchingChat,
}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const res = await getChats();
    setChats(res);
  };

  const handleNewChat = async () => {
    const newChat = await createChat('Untitled Chat');
    setChats((prev) => [...prev, newChat]);
    isSwitchingChat.current = true;
    setActiveChatId(newChat.chat_id);
    setMessages([]);
  };

  const handleDelete = async (chatId) => {
    try {
      await deleteChat(chatId);
      setChats((prev) => prev.filter((c) => c.chat_id !== chatId));
      if (chatId === activeChatId) {
        setActiveChatId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Failed to delete chat:', err);
    }
  };

  return (
    <div className="w-64 h-[95vh] m-4 bg-[#2c2c38]/70 backdrop-blur-md rounded-xl text-white px-4 py-6 flex flex-col gap-6 shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-[#3a3a4c] flex items-center justify-center text-xl font-bold">
          U
        </div>
        <div className="text-sm text-gray-300">username@email.com</div>
      </div>

      <button
        onClick={handleNewChat}
        className="w-full bg-[#3a00ff] hover:bg-[#4e21ff] text-white py-2 rounded-full font-semibold transition shadow-md"
      >
        + New Chat
      </button>

      <div className="flex flex-col gap-2 overflow-y-auto text-sm text-gray-300">
        {chats.map((chat) => (
          <div
            key={chat.chat_id}
            className={`relative group rounded-md transition px-3 py-2 flex items-center justify-between ${
              activeChatId === chat.chat_id
                ? 'bg-[#3a00ff]/30 text-white'
                : 'hover:bg-[#3a00ff]/10'
            }`}
          >
            <button
              onClick={() => {
                isSwitchingChat.current = true;
                setActiveChatId(chat.chat_id);
                setMessages(chat.messages);
              }}
              className="flex-1 text-left truncate"
            >
              {chat.title}
            </button>

            <button
              onClick={() => handleDelete(chat.chat_id)}
              className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 text-sm transition"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
