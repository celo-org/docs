---
title: MCP Server
description: Learn how to get started with MCP servers and implement the Model Context Protocol
---

import YouTube from '@components/YouTube';

# Model Context Protocol (MCP)

[The Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). It was developed by Anthropic, the AI company behind Claude, to solve the challenge of consistently and efficiently connecting AI models with various data sources and tools. This makes Claude natively compatible with all MPC servers. OpenAI has announced compatibility with the MCP standard, ensuring broad adoption across major AI platforms.

## Celo specific MCPs:

- [Celo MPC Server](./celo-mcp.md)
  - Chain Info
  - Governance Proposals
- [Composer Kit MCP](./composer-mcp.md)
  - starterkit
  - components
  - set up your project on Celo in minutes

<YouTube videoId="7XInE4Ll0as"/>

## Why MCP?

MCP helps you build agents and complex workflows on top of LLMs by providing:

- A growing list of pre-built integrations that your LLM can directly plug into
- The flexibility to switch between LLM providers and vendors
- Best practices for securing your data within your infrastructure

## Core Architecture

MCP follows a client-server architecture where a host application can connect to multiple servers:

### Components

- **MCP Hosts**: Programs like Claude Desktop, IDEs, or AI tools that want to access data through MCP
- **MCP Clients**: Protocol clients that maintain 1:1 connections with servers
- **MCP Servers**: Lightweight programs that each expose specific capabilities through the standardized Model Context Protocol
- **Local Data Sources**: Your computer's files, databases, and services that MCP servers can securely access
- **Remote Services**: External systems available over the internet (e.g., through APIs) that MCP servers can connect to

## Discover MCP Servers

Explore existing MCP server implementations:

- [Awesome MCP Servers](https://mcpservers.org/) - Technical implementations
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - Technical, art, marketing, and more

## Additional Resources

- [Official MCP Documentation](https://modelcontextprotocol.io/introduction)
- [MCP GitHub Repository](https://github.com/anthropics/model-context-protocol)
- [MCP Community Forum](https://community.modelcontextprotocol.io)


