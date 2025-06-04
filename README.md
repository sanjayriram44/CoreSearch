# 🧠 CoreSearch — Chat-Style Research Assistant (React + FastAPI)

CoreSearch is your fast, local research agent. Powered by **Groq (Mistral SABA 24B)** and **LangChain**, this full-stack app gives you an AI assistant that pulls from real-time web, Wikipedia, and academic sources.

No fluff. Just chat, tools, and fast responses.

---

## 🚀 Features
- 🔍 **Ask Anything** Get answers powered by `mistral-saba-24b` hosted on Groq.
- 🧠 **LangChain Agent** Smart tool use via ReAct logic.
- 📚 **Research Tools** Wikipedia, DuckDuckGo, arXiv search, PDF support (WIP).
- 💬 **Multi-Chat Support** Create, name, and revisit chats.
- 💾 **Chat History (MongoDB)** Persistent conversations.
- ⚡ **Fast Backend** Built with FastAPI + Groq's blazing inference.
- 💻 **Red-Themed UI** React + Tailwind, clean dark mode.

---

## 🛠 Stack

| Tech                | Role                        |
|---------------------|-----------------------------|
| React + Tailwind    | Frontend                    |
| FastAPI             | Backend API                 |
| LangChain           | Agent + tool orchestration  |
| Groq + Mistral      | LLM backend                 |
| MongoDB             | Chat storage                |
| DuckDuckGo API      | Web search                  |
| arXiv API           | Academic paper lookup       |
| Wikipedia API       | General fact search         |

---

## 🧪 Local Setup

```bash
1. 
git clone [https://github.com/your-username/CoreSearch](https://github.com/your-username/CoreSearch)
cd CoreSearch

2.
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
MONGO_URL=your_mongo_uri
GROQ_API_KEY=your_groq_key
uvicorn main:app --reload

3.
cd frontend
npm install
npm run dev
```


CoreSearch/
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── db.py
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── components/
│   │       └── Sidebar.jsx
│   └── index.css
├── .gitignore
└── README.md

✨ Live Demo
Coming soon. Local runs smooth and fast.

🔒 Notes
No user auth (yet)
Local MongoDB required
Ideal for showcasing full-stack + LangChain apps
📄 License
MIT
