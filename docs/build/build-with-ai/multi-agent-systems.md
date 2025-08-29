---
title: Multi-Agent Systems
description: A production-grade multi-agent system built with LangGraph and LangChain, featuring a web search agent and a Celo blockchain agent powered by Google's Gemini.
---
import YouTube from '@components/YouTube';


# Multi-Agent Systems

Learn how to build a [production-grade multi-agent system](https://github.com/celo-org/example-multi-agent-system) built with LangGraph and LangChain, featuring a web search agent and a Celo blockchain agent powered by Google's Gemini.

<YouTube videoId="5bLZqf_YBmQ"/>

## Features

- 🤖 **Supervisor agent** that orchestrates specialized agents
- 🔍 **Web search agent** for retrieving real-time information
- ⛓️ **Blockchain agent** for fetching Celo blockchain data
- 📊 **Memory management** for conversation history
- 🤖 **Gemini AI** for intelligent agent capabilities
- 🧵 **Thread support** for maintaining conversation state

## What are Multi-Agent Systems?

Sure! Here's a simplified and accessible **concept module**-style intro to **multiagent systems**, tailored to fit the Celo Docs style:

---

## What Are Multiagent Systems?

Multiagent systems (MAS) are groups of independent software agents that work together to solve complex problems. Instead of relying on one big, centralized program, MAS use many smaller agents—each with their own goals and responsibilities. These agents can **collaborate**, **compete**, or **coordinate** to get things done more efficiently.

In Web3, this is especially powerful. Agents can perform tasks like:

* Optimizing DeFi yields
* Voting in governance protocols
* Bridging assets across blockchains
* Managing liquidity in real-time

Because these agents are **autonomous** and can operate in **parallel**, the system becomes more scalable and resilient. If one agent fails, others can keep running. That means fewer single points of failure—an important trait in decentralized systems.

Multiagent architectures help developers build apps that respond to changing network conditions, user demands, or even market dynamics without needing centralized control. This makes them a great match for Celo’s L2 ecosystem and the broader Web3 world.


## Architecture

The system uses a hierarchical multi-agent architecture with a supervisor agent orchestrating specialized agents.

![AI](/img/developer/multi-agents.png)

## Setup

1. Clone the [repository](https://github.com/celo-org/example-multi-agent-system)
2. Install dependencies:

```bash
pip install -e ".[dev]"
```

3. Set up environment variables:

```bash
export GOOGLE_API_KEY=your_google_api_key
export TAVILY_API_KEY=your_tavily_api_key
```

You can also create a `.env` file in the project root (the application uses python-dotenv to load variables automatically).

## Usage

Run the main application:

```bash
python main.py
```

The application maintains conversation state using thread IDs, allowing for coherent multi-turn interactions.

## Project Structure

```
multi-agent-system/
├── src/
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── blockchain_agent.py  # Agent for Celo blockchain interactions
│   │   ├── search_agent.py      # Agent for web search capabilities
│   │   └── supervisor.py        # Orchestrates specialized agents
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── blockchain_tools.py  # Tools for interacting with Celo blockchain
│   │   └── search_tools.py      # Tools for web search using Tavily
│   └── utils/
│       ├── __init__.py
│       └── config.py            # Configuration and environment variables
├── main.py                      # Application entry point
├── pyproject.toml               # Dependencies and project metadata
└── README.md
```

## How It Works

1. The **Supervisor Agent** analyzes user queries and determines which specialized agent to use
2. For blockchain-related queries, the **Blockchain Agent** fetches real-time data from the Celo blockchain
3. For information retrieval, the **Search Agent** uses Tavily to search the web for relevant information
4. All conversation state is maintained using **thread IDs** for coherent multi-turn interactions
5. The system uses Google's **Gemini** models for intelligent natural language understanding and generation

## License

MIT