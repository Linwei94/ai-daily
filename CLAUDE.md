# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

个人 AI 论文知识库。工作流:
1. 用户阅读最近的论文(arXiv / Hugging Face / 会议论文)。
2. 用 `graphify` skill 将论文整理为知识图谱(HTML + JSON + 审计报告)。
3. 产物按主题/会议/时间归档在本目录下,逐步累积形成可检索的个人知识图谱。

## Primary Workflow

- 用户输入论文(PDF 路径、arXiv ID、URL 或一段文本)时,**主动调用 `graphify` skill**(`/graphify` 或 Skill 工具),不要自己手写总结。
- 抓取 arXiv 用 `mcp__arxiv-mcp-server__*`(search / download / read);搜 HF 论文用 `mcp__claude_ai_Hugging_Face__paper_search`。
- graphify 产物默认是 HTML + JSON + audit report 三件套,放到对应主题子目录下,不要散落在根目录。

## Conventions

- 目录组织按**主题**而非时间(例如 `rl/`, `agents/`, `inference/`, `multimodal/`),每个主题下再按论文分子目录。
- 每篇论文一个子目录,内含原始 PDF(或链接)+ graphify 产物,便于后续合并/重新生成图谱。
- 中文回复(全局规则);论文标题、术语、作者名保留原文。

## What NOT to do

- 不要在本仓库初始化复杂构建系统(无 package.json / pyproject 等需求),这是知识库不是代码库。
- 不要为论文手写 markdown 摘要替代 graphify —— graphify 是这个项目的核心工具。
- 没有 git 仓库初始化需求前不要 `git init`。
