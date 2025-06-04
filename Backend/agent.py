from langchain_groq import ChatGroq
import langgraph
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, AIMessage

from tools.web_search import web_search
from tools.arxiv_search import arxiv_search
from tools.wikipedia_search import wikipedia_search

llm = ChatGroq(model_name="mistral-saba-24b")
tools = [web_search, arxiv_search, wikipedia_search]
agent = create_react_agent(llm, tools)

def run_agent(messages):
    return agent.invoke({ "messages": messages })
