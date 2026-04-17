# Graph Report - /home/linwei/ai-knowledge/topics  (2026-04-17)

## Corpus Check
- 6 files · ~69,097 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 117 nodes · 119 edges · 15 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Seedance Model Lineage|Seedance Model Lineage]]
- [[_COMMUNITY_Visual Editing Benchmarks|Visual Editing Benchmarks]]
- [[_COMMUNITY_RL Methods (GRPO Family)|RL Methods (GRPO Family)]]
- [[_COMMUNITY_ClawGUI Training Infra|ClawGUI Training Infra]]
- [[_COMMUNITY_GUI Agent Benchmarks|GUI Agent Benchmarks]]
- [[_COMMUNITY_GUI Agent Components|GUI Agent Components]]
- [[_COMMUNITY_Seedance 2.0 Architecture|Seedance 2.0 Architecture]]
- [[_COMMUNITY_Reasoning Reward Models|Reasoning Reward Models]]
- [[_COMMUNITY_Subject Control|Subject Control]]
- [[_COMMUNITY_Motion Manipulation|Motion Manipulation]]
- [[_COMMUNITY_Style Transfer|Style Transfer]]
- [[_COMMUNITY_Video Quality Metrics|Video Quality Metrics]]
- [[_COMMUNITY_GPT-Image-1|GPT-Image-1]]
- [[_COMMUNITY_Gemini 3 Pro|Gemini 3 Pro]]
- [[_COMMUNITY_GPT-5|GPT-5]]

## God Nodes (most connected - your core abstractions)
1. `Seedance 2.0` - 23 edges
2. `RationalRewards Model (8B)` - 22 edges
3. `ClawGUI-RL` - 14 edges
4. `RationalRewards (Paper)` - 14 edges
5. `ClawGUI-Eval` - 13 edges
6. `PARROT (Preference-Anchored Rationalization)` - 8 edges
7. `ClawGUI (Paper)` - 7 edges
8. `SeedVideoBench 2.0` - 4 edges
9. `ClawGUI Framework` - 4 edges
10. `ClawGUI-Agent` - 4 edges

## Surprising Connections (you probably didn't know these)
- `DiffusionNFT` --semantically_similar_to--> `Seedance 2.0`  [INFERRED] [semantically similar]
  topics/multimodal/2604.11626-rationalrewards/paper.md → topics/video/2604.14148-seedance-2/paper.md
- `MLLM-as-Judge` --semantically_similar_to--> `RationalRewards Model (8B)`  [INFERRED] [semantically similar]
  topics/agents/2604.11784-clawgui/paper.md → topics/multimodal/2604.11626-rationalrewards/paper.md
- `Process Reward Model (PRM)` --semantically_similar_to--> `RationalRewards Model (8B)`  [INFERRED] [semantically similar]
  topics/agents/2604.11784-clawgui/paper.md → topics/multimodal/2604.11626-rationalrewards/paper.md
- `Seedance 2.0` --conceptually_related_to--> `RationalRewards Model (8B)`  [INFERRED]
  topics/video/2604.14148-seedance-2/paper.md → topics/multimodal/2604.11626-rationalrewards/paper.md
- `Seed-VL multimodal vision-language model` --semantically_similar_to--> `Qwen3-VL`  [INFERRED] [semantically similar]
  topics/video/2604.14148-seedance-2/paper.md → topics/agents/2604.11784-clawgui/paper.md

## Hyperedges (group relationships)
- **Seedance 2.0 Unified Multimodal Audio-Video Pipeline** — seedance_2_0, seedance_multimodal_audiovideo, seedance_binaural_audio, seedance_t2v, seedance_i2v, seedance_r2v [EXTRACTED 1.00]
- **SeedVideoBench 2.0 evaluation dimensions** — seedance_seedvideobench_2, seedance_motion_quality_metric, seedance_audio_visual_sync, seedance_narrative_quality, seedance_cinematographic_lang [EXTRACTED 1.00]
- **ClawGUI Three-Module Framework** — clawgui_framework, clawgui_rl, clawgui_eval, clawgui_agent, clawgui_2b [EXTRACTED 1.00]
- **ClawGUI-RL training stack (GiGPO + PRM + Env Manager)** — clawgui_rl, clawgui_gigpo, clawgui_prm, clawgui_environment_manager, clawgui_mllm_judge, clawgui_verl [EXTRACTED 1.00]
- **PARROT three-phase pipeline (hindsight, consistency filter, foresight SFT)** — rationalrewards_parrot, rationalrewards_elbo, rationalrewards_hindsight_foresight, rationalrewards_consistency_filter, rationalrewards_pointwise_projection, rationalrewards_qwen3_vl_32b [EXTRACTED 1.00]
- **RationalRewards dual-space optimization (RL + Test-time PT)** — rationalrewards_model, rationalrewards_generate_critique_refine, rationalrewards_diffusion_nft, rationalrewards_lora, rationalrewards_reward_hacking [EXTRACTED 1.00]

## Communities

### Community 0 - "Seedance Model Lineage"
Cohesion: 0.1
Nodes (21): Seedance 1.0, Seedance 1.5 Pro, Seedance 2.0, Seedance 2.0 Fast, Arena.AI (formerly LMArena), Binaural Audio Generation, Doubao, Image-to-Video (I2V) (+13 more)

### Community 1 - "Visual Editing Benchmarks"
Cohesion: 0.12
Nodes (17): DiffusionNFT, FLUX.1-dev, FLUX.1 Kontext [dev], GEdit-Bench-EN, Gemini 2.5 Pro, GenAI-Bench, Generate-Critique-Refine Loop, HPDv3 Preference Data (+9 more)

### Community 2 - "RL Methods (GRPO Family)"
Cohesion: 0.14
Nodes (15): GRPO, Alibaba, DanceGRPO, EditReward, FlowGRPO, Grounding DINO + SAM, HKUST, ImageReward (+7 more)

### Community 3 - "ClawGUI Training Infra"
Cohesion: 0.17
Nodes (13): ClawGUI-2B, Docker Android Emulator (parallel), Environment Manager, GiGPO Algorithm, GSPO, MAI-UI / MAI-UI-2B, MLLM-as-Judge, MobileWorld Benchmark (+5 more)

### Community 4 - "GUI Agent Benchmarks"
Cohesion: 0.17
Nodes (12): AndroidControl, ClawGUI-Eval, GUI-G2, GUI-Owl, MMBench-GUI, OSWorld-G, Qwen2.5-VL, ScreenSpot-Pro (+4 more)

### Community 5 - "GUI Agent Components"
Cohesion: 0.17
Nodes (12): ClawGUI-Agent, Aguvis, ClawGUI Framework, Hybrid CLI-GUI Control, OpenClaw, ClawGUI (Paper), Personalized Memory System, SAM (Segment Anything) (+4 more)

### Community 6 - "Seedance 2.0 Architecture"
Cohesion: 0.2
Nodes (11): Qwen3-VL, Qwen3-VL-Instruct-8B (backbone), Audio-Visual Sync Metric, ByteDance Seed Team, Cinematographic Language, Motion Quality Evaluation Dimension, Narrative Quality Evaluation, Seedance 2.0 (Paper) (+3 more)

### Community 7 - "Reasoning Reward Models"
Cohesion: 0.22
Nodes (9): Process Reward Model (PRM), Qwen3.5-72B (PRM judge), Predictive Consistency Filter, Chain-of-Thought Reasoning, ELBO Variational Objective, Hindsight-Foresight Decomposition, PARROT (Preference-Anchored Rationalization), Pointwise Projection Strategy (+1 more)

### Community 8 - "Subject Control"
Cohesion: 1.0
Nodes (1): Subject Control

### Community 9 - "Motion Manipulation"
Cohesion: 1.0
Nodes (1): Motion Manipulation

### Community 10 - "Style Transfer"
Cohesion: 1.0
Nodes (1): Style Transfer

### Community 11 - "Video Quality Metrics"
Cohesion: 1.0
Nodes (1): FVD / CLIPScore

### Community 12 - "GPT-Image-1"
Cohesion: 1.0
Nodes (1): GPT-Image-1

### Community 13 - "Gemini 3 Pro"
Cohesion: 1.0
Nodes (1): Gemini 3 Pro

### Community 14 - "GPT-5"
Cohesion: 1.0
Nodes (1): GPT-5

## Knowledge Gaps
- **90 isolated node(s):** `Seedance 2.0 Fast`, `Seedance 1.5 Pro`, `Seedance 1.0`, `Seedream image generation series`, `Native Multimodal Audio-Video Generation` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Subject Control`** (1 nodes): `Subject Control`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Motion Manipulation`** (1 nodes): `Motion Manipulation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Style Transfer`** (1 nodes): `Style Transfer`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Video Quality Metrics`** (1 nodes): `FVD / CLIPScore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GPT-Image-1`** (1 nodes): `GPT-Image-1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Gemini 3 Pro`** (1 nodes): `Gemini 3 Pro`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GPT-5`** (1 nodes): `GPT-5`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RationalRewards Model (8B)` connect `Visual Editing Benchmarks` to `Seedance Model Lineage`, `RL Methods (GRPO Family)`, `ClawGUI Training Infra`, `Seedance 2.0 Architecture`, `Reasoning Reward Models`?**
  _High betweenness centrality (0.571) - this node is a cross-community bridge._
- **Why does `Seedance 2.0` connect `Seedance Model Lineage` to `Visual Editing Benchmarks`, `Seedance 2.0 Architecture`?**
  _High betweenness centrality (0.360) - this node is a cross-community bridge._
- **Why does `ClawGUI-RL` connect `ClawGUI Training Infra` to `RL Methods (GRPO Family)`, `GUI Agent Components`, `Reasoning Reward Models`?**
  _High betweenness centrality (0.323) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Seedance 2.0` (e.g. with `RationalRewards Model (8B)` and `DiffusionNFT`) actually correct?**
  _`Seedance 2.0` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `RationalRewards Model (8B)` (e.g. with `Process Reward Model (PRM)` and `MLLM-as-Judge`) actually correct?**
  _`RationalRewards Model (8B)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Seedance 2.0 Fast`, `Seedance 1.5 Pro`, `Seedance 1.0` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seedance Model Lineage` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._