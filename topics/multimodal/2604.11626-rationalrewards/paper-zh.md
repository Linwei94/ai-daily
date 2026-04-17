# RationalRewards:把推理型奖励同时用在视觉生成的训练 + 测试时

**arXiv**: 2604.11626 · **团队**: HKUST × University of Waterloo × Alibaba · **分类**: multimodal / reward modeling

> 作者:Haozhe Wang (HKUST), Cong Wei (Waterloo), Weiming Ren (Waterloo), Jiaming Liu (Alibaba), Fangzhen Lin (HKUST), Wenhu Chen (Waterloo)
> 中文精读 · 原文 [paper.md](./paper.md)

## 一句话

把视觉生成的 reward model 从"只输出一个分数"升级到"先写出**结构化批评(rationale)**再给分数",从而让它**同时**改善训练时的 RL 和测试时的 prompt 优化 —— 8B 模型在偏好预测上对标 Gemini 2.5 Pro,而且训练数据还少 10-20 倍。

## 痛点

现有视觉生成 reward model 把人类丰富的判断压成单一数值,**丢掉了"为什么打这个分"的推理过程**。后果:

1. RL 训练只能拿到 sparse、不可解释的 scalar reward,容易 reward hacking
2. 测试时无法用 reward 信号去**指导**生成 —— 你只能拿它打分,不能拿它改进
3. 训练 reward model 需要昂贵的 rationale 标注

## 核心思路:Reasoning Reward(推理型奖励)

让 reward model 在打分前**先生成多维度的批评文本**:
- 训练时 RL → 提供细粒度可解释的 reward 信号
- 测试时 → 把批评 → 转成 prompt 修订指令 → **Generate-Critique-Refine 闭环**

### PARROT 框架 — 在没有 rationale 标注的情况下训出 reward model

**P**reference-**A**nchored **R**ationaliza**t**ion 三阶段:

1. **Hindsight Anchored Generation** — 已知偏好结果 → 反向生成解释为什么 A 比 B 好
2. **Consistency Filtering** — 把不一致的 rationale 过滤掉
3. **Foresight SFT Distillation** — 把高质量 rationale 蒸馏到学生模型

底座用的是 **Qwen3-VL-32B** 作为 PRM (Process Reward Model) judge。

### Generate-Critique-Refine 测试时循环

```
prompt → 生成图像 → reward model 输出批评 →
        prompt 自动修订 → 重新生成 → ...
```

不需要任何参数更新,纯 inference-time 优化。

## 实验亮点

### 偏好预测准确率

- **RationalRewards-8B** 与 **Gemini-2.5-Pro** 持平
- 训练数据用量比 baselines **少 10-20 倍**
- 在开源 reward model 中 SOTA

### 用作 RL 奖励改进生成器

- **+15% 偏好胜率**(GenAI-Bench / GEdit-Bench-EN / HPDv3 / UniGenBench++ 等多个基准)
- 改善 GPT-Image-1 / FLUX.1-dev / Qwen-Image 等多个生成器

### 测试时 PromptTuning(惊人结果)

> "Test-time PT with RationalRewards alone can surpass expensive RL"

测试时 critique-and-refine 循环在多个 benchmark 上 **达到甚至超过** RL fine-tuning 的效果 —— 暗示当前 prompt 远未充分激发模型潜在能力。

## 与 LLM Reasoning 的关系

这是一篇**典型的"LLM 范式迁移到视觉生成"**:

| LLM 世界 | 视觉生成世界(本文) |
|---|---|
| Process Reward Model (o1/PRM800K) | RationalRewards (8B PRM) |
| Chain-of-Thought | Multi-dimensional Critique |
| Self-Refine / Reflexion | Generate-Critique-Refine |
| RLHF reasoning reward | RL with reasoning visual reward |

## 我的看法

- ★ **Test-time scaling 在视觉生成第一次被验证有效** —— 这可能比 RL 更重要,因为 inference-time 优化几乎零成本
- ★ PRM 思路在不同模态(LLM / GUI / 视觉生成)同时奏效,印证 PRM 是新一轮 RL 的 universal recipe
- ★ HKUST + Waterloo + Alibaba 这种产学跨机构组合做工程性强的工作,容易复现
- ⚠ 8B reward model 推理仍有成本,Generate-Critique-Refine 循环每次要多次推理
- ⚠ 论文未明确开源时间表,要等 Project Page 更新
