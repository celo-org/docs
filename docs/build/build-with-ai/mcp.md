---
title: MCP Server
description: Learn how to get started with MCP servers and implement the Model Context Protocol
---

# Model Context Protocol (MCP)

[The Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). It was developed by Anthropic, the AI company behind Claude, to solve the challenge of consistently and efficiently connecting AI models with various data sources and tools.

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

## Getting Started

Choose the path that best fits your needs:

### For Server Developers
- Build your own server to use in Claude for Desktop and other clients
- Implement specific capabilities through the standardized protocol
- Secure access to local and remote data sources

### For Client Developers
- Build your own client that can integrate with all MCP servers
- Implement the protocol to connect with various data sources
- Create seamless user experiences

### For Claude Desktop Users
- Use pre-built servers in Claude for Desktop
- Access various data sources through MCP integrations
- Enhance your AI interactions with contextual information

## Core Concepts

### Resources
- Expose data and content from your servers to LLMs
- Define how information is structured and accessed

### Prompts
- Create reusable prompt templates and workflows
- Standardize how context is provided to LLMs

### Tools
- Enable LLMs to perform actions through your server
- Define available operations and their parameters

### Sampling
- Let your servers request completions from LLMs
- Control how AI models generate responses

### Transports
- Learn about MCP's communication mechanism
- Understand how data flows between components

## Development Tools

### SDKs Available
- Python SDK
- TypeScript SDK
- Java SDK
- Kotlin SDK
- C# SDK
- Swift SDK

### Debugging Tools
- MCP Inspector for testing and inspecting servers
- Debugging Guide for effective server troubleshooting
- Interactive debugging capabilities

## Discover MCP Servers

Explore existing MCP server implementations:

- [Awesome MCP Servers](https://mcpservers.org/) - Technical implementations
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - Technical, art, marketing, and more

## Additional Resources

- [Official MCP Documentation](https://modelcontextprotocol.io/introduction)
- [MCP GitHub Repository](https://github.com/anthropics/model-context-protocol)
- [MCP Community Forum](https://community.modelcontextprotocol.io)

## Support and Feedback

- For bug reports and feature requests: Create a GitHub issue
- For MCP specification discussions: Use specification discussions
- For other MCP components: Use organization discussions
- For Claude.app and claude.ai MCP integration: See Anthropic's support guide

