# ClawGUI:GUI Agent 训练 / 评测 / 部署一体化框架

**arXiv**: 2604.11784 · **团队**: 浙江大学 ZJU-REAL · **分类**: agents

> 作者:Fei Tang*, Zhiqiong Lu*, Boxuan Zhang, Weiming Lu, Jun Xiao, Yueting Zhuang, Yongliang Shen†
> 中文精读 · 原文 [paper.md](./paper.md) · [GitHub](https://github.com/zju-real/ClawGUI) · [Project Page](https://zju-real.github.io/ClawGUI-Page)

## 一句话

把 GUI Agent 全流程**第一次**用一套开源框架打通 —— 训练用 ClawGUI-RL,评测用 ClawGUI-Eval,部署用 ClawGUI-Agent,论文里同时端到端训出 **ClawGUI-2B** 在 MobileWorld 上 17.1% 成功率,小模型超越同规模 MAI-UI-2B 6.0%。

## 痛点

GUI Agent(用视觉直接操控应用,不靠 API)长尾价值巨大,但社区进展慢,卡在三个工程问题:

1. **训练侧**:online RL 在真实 / 虚拟环境里都不稳定,各家流水线封闭、不可复现
2. **评测侧**:同一个 benchmark 各家实现不同,数字横向比对失真
3. **部署侧**:训出来的模型很少真正跑到用户手机上

ClawGUI 把这三块拆成 3 个开源模块,每块都打磨到生产可用。

## 三大模块

### ClawGUI-RL — 第一个开源 GUI Agent RL 训练栈

- **核心算法**:**GiGPO**(Group-in-Group Policy Optimization),解决 GUI 长 horizon 任务里 GRPO 的高方差
- **奖励**:**Process Reward Model (PRM)** 提供 dense step-level 监督,而不是只在 episode 末尾给一个稀疏 reward
- **环境**:同时支持 **并行虚拟环境**(Docker Android Emulator)和 **真实物理设备**
- **判分**:**MLLM-as-Judge** 自动评分

### ClawGUI-Eval — 标准化评测

- 统一支持 **6 个 benchmark**(AndroidControl / MobileWorld / Screenspot-Pro / UI-Vision / MMBench-GUI / GUI-G2)
- 覆盖 **11+ 模型**(开源 + 闭源)
- **95.8% 复现率** 对齐官方 baseline,解决"数字虚高"问题

### ClawGUI-Agent — 落地到真实设备

- 支持 **Android / HarmonyOS / iOS**
- 集成 **12+ 聊天平台**(微信、QQ、Telegram 等)
- **Hybrid CLI-GUI Control**:能调 CLI 就走 CLI,GUI 兜底
- **持久化个性化记忆**

## 实验亮点

| 模型 | 规模 | MobileWorld GUI-Only Success Rate |
|---|---|---|
| MAI-UI-2B (baseline) | 2B | 11.1% |
| **ClawGUI-2B** | 2B | **17.1%** (+6.0) |
| GUI-Owl | 7B | (paper has full table) |
| Aguvis | 7B | (paper has full table) |

ClawGUI-2B 这个 2B 小模型在 MobileWorld 上能干赢 7B 级别的特化 agent,显示训练栈本身比模型规模更重要。

## 关键依赖

- **Verl** 作为分布式 RL 训练 backbone
- **GiGPO** 作为新引入的算法变种
- **OpenClaw** 设备控制框架(下层)

## 我的看法

- ★ ZJU-REAL 团队过去的 OpenClaw / Aguvis / GiGPO 几篇工作是这一篇的基石,代码已开源,**复现门槛低**
- ★ "训练-评测-部署一体化"是 GUI Agent 走向产品的必经之路;先有这套基建,后面才会有真正的 SOTA
- ★ Process Reward Model 在 GUI 任务里的成功,让人想起 RationalRewards 在视觉生成里的同样思路 —— PRM 可能是 2026 年 RL 的 universal recipe
- ⚠ 17.1% 离实用还差很远(MobileWorld 是较难的 benchmark),Agent 落地仍是早期阶段
