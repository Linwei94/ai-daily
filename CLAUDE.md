# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

个人 AI 论文 + 新闻知识库,部署在 GitHub Pages → http://www.taolinwei.com/ai-daily/。
工作流由两个 skill 驱动:`/ai-daily` 生成简报,`/graphify` 构建知识图谱。详见 [README.md](./README.md)。

## Site Structure

- `index.html` = **today's briefing**(由 `scripts/build.sh` 从最新 `daily/*.html` 复制 + 路径重写)
- `dashboard.html` = 总览(stats / 全局图谱 iframe / 跨论文洞察)
- `daily/YYYY-MM-DD.html` = 按日期归档的简报;`daily/index.html` = 列表
- `topics/<topic>/` = 主题论文库,每个主题下 `<arxiv-id>-<slug>/{paper.md, paper.pdf}`
- `graph/global/graph.html` = 所有论文合并图谱(graphify);`graph/<topic>/` = 主题子图
- `assets/style.css` 是单一样式源,所有页面 `<link>` 引入 — 改一处全站生效

## Build Pipeline

每次新增内容后,**必须**跑这两步同步前端:

```fish
python3 scripts/per_topic_graph.py    # 重切主题子图
./scripts/build.sh                    # 同步 index.html + 刷新 dashboard stats
git add -A && git commit -m "..." && git push
```

`build.sh` 会:
1. 找最新 `daily/2*.html`,复制到 `index.html` 并把 `../` 路径重写成 `./`
2. 扫 `topics/*/<id>/paper.md` 数论文数,扫 `daily/2*.html` 数简报数
3. 解析 `graph/global/graph.json` + `GRAPH_REPORT.md` 拿节点数 / 社区数
4. 用正则 patch `dashboard.html` 里的 `<div class="num">` 数字

## Conventions

- **主题 slug**:小写、`-` 分词(`world-model` 不是 `World Model`)
- **论文目录名**:`<arxiv-id>-<short-slug>`(去掉 v1/v2 后缀)
- **大厂团队高亮**:在论文 `<div class="authors">` 里给 `<span class="org star">` 标签(★ 自动加,terra-cotta 强调)
- **Markdown 链接**:`<a href="...paper.md">` 自动被 `assets/modal.js` 拦截弹窗渲染;加 `data-no-modal` 或 `target="_blank"` 跳过
- **PDF 不入 git**(`.gitignore: *.pdf`),开放 arXiv 资源没必要占仓库空间

## Visual System

Claude.ai 浅色调色板:
- 背景 `#faf9f5`(warm cream),卡片 `#fff` / `#f4f1e8`,边框 `#e8e5d8`
- 强调 terra-cotta `#d97757`,渐变 `linear-gradient(135deg, #ff6b9d → #c66bff → #6b9dff)` 已弃用,统一改 `#d97757 → #cc785c → #b8643f`
- 字体走 system stack(Inter / SF Pro fallback),等宽走 `JetBrains Mono` fallback
- 移动端 < 768px 单列,< 480px 进一步压缩 hero / chips

## What NOT to do

- 不要手写 `index.html` —— 它是 build artifact,任何编辑下次 `build.sh` 都会被覆盖。改 `daily/<today>.html` 然后 rebuild。
- 不要在 HTML 里引外部 CDN(marked.js / icons 全部 vendored 到 `assets/`)
- 不要手写 dashboard 的 stat 数字 —— `build.sh` 会刷
- 不要把 `graphify-out/` 提交到 git(已 gitignore;只 `graph/` 是用户可见产物)
- 不要按 arXiv 时间倒序拉论文 —— `/ai-daily` 用 HuggingFace Trending 作为热度源
