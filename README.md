# ai-daily · 个人 AI 知识库

🌐 **Live**: http://www.taolinwei.com/ai-daily/

每日 AI 必读 + 主题论文库 + graphify 知识图谱,三合一的个人知识管理工作台。
由 Claude Code skill `/ai-daily` 自动生成简报、`/graphify` 自动构建知识图谱。

## 结构

```
.
├── index.html              # 落地页 = 今日简报(由 build.sh 从最新 daily/ 复制)
├── dashboard.html          # 总览:统计 + 全局图谱 iframe + 跨论文洞察
├── daily/                  # 按日期归档的简报
├── topics/<topic>/         # 按主题组织的论文(video / agents / multimodal / rl ...)
│   └── <id>-<slug>/        # 每篇论文 paper.md + paper.pdf(.gitignore 排除 PDF)
├── graph/
│   ├── global/             # 所有论文合并图谱(graphify topics/)
│   └── <topic>/            # 主题级子图(scripts/per_topic_graph.py 生成)
├── assets/
│   ├── style.css           # 共享样式(Claude 浅色 / 暖米黄 + terra-cotta)
│   ├── icons/              # 大厂品牌 SVG
│   ├── marked.min.js       # 客户端 markdown 渲染
│   └── modal.js            # 论文 markdown 弹窗
└── scripts/
    ├── build.sh            # 同步 index.html + 刷新 dashboard 统计
    └── per_topic_graph.py  # 从全局图谱切出每个主题的子图
```

## 工作流

1. `/ai-daily` (Claude Code skill) — 抓 HuggingFace Trending W## + 大厂动态,生成 `daily/YYYY-MM-DD.html`。
2. 选论文入库 → `/graphify topics/` 构建全局图谱。
3. `python3 scripts/per_topic_graph.py` 切出每个主题的子图。
4. `./scripts/build.sh` 同步 index.html + 刷新 dashboard 统计。
5. `git push` → GitHub Pages 自动部署到 taolinwei.com/ai-daily/。

## 浏览方式

- macOS / 远程访问:打开 https://www.taolinwei.com/ai-daily/
- 本地:`cd /home/linwei/ai-knowledge && python3 -m http.server 8765`,浏览器开 http://localhost:8765/

## 标记约定

- ⭐ 大厂 / 知名团队会有 `org star` 标签高亮(ByteDance Seed、Anthropic、ZJU-REAL 等)
- ✅ 已入库 = 论文 PDF + Markdown 已下载,且并入 graphify 图谱
- 🔥 顶热 / 高热 = HuggingFace 当周 Trending Top 排名
