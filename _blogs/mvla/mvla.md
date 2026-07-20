---
layout: post
title: "Beyond English: Uncovering the Multilingual Gap in Vision-Language-Action Models"
date: 2026-07-13
permalink: /blogs/mvla/
summary: "We present the first systematic study of multilingual instruction following in vision-language-action models, identify the causes of the multilingual gap, and propose MPCA to align multilingual embeddings."
---

> **Authors**: Hanyang Chen, Hongliang Li, Jiarui Cao, Yang Jiang, Haonan Wen, Kaiyu Huang, Shengnan Guo, Huaiyu Wan  
> **Affiliation**: Beijing Jiaotong University  
> **Links**: [https://alphaxiv.org/abs/2606.15714](https://alphaxiv.org/abs/2606.15714)

---

## TL;DR

Vision-Language-Action (VLA) models are typically trained and evaluated with **English-only instructions**. We present the first systematic study of multilingual instruction following in VLAs and show that:

- **A large multilingual gap exists**: non-English instructions cause sharp performance drops, sometimes close to the no-instruction baseline.
- **The gap has two causes**: instruction misunderstanding *and* action-execution failure.
- **The root cause is representational**: multilingual inputs shift the VLM backbone’s embeddings away from English.
- **A simple fix helps**: **MPCA** aligns multilingual embeddings in the principal-component subspace and closes most of the gap.

---

## Why Multilingual Evaluation Matters

Robots will be deployed globally and must understand Chinese, French, Arabic, Russian, and many other languages. A common assumption is that multilingual VLMs such as Qwen-VL automatically transfer their language skills to downstream VLAs.

**They do not.** During language-to-action alignment, VLAs can become implicitly biased toward English, causing large performance drops on other languages.

---

## Our Framework

We translate existing robot benchmark instructions into **Chinese, French, Russian, and Arabic**, and also create **code-switching** variants (e.g., “pick up 碗”). Evaluation is done on LIBERO and SimplerEnv via a Multilingual Evaluation Adapter.

![Multilingual evaluation framework for VLAs](/blogs/mvla/images/framework.jpg)
*Figure 1: Three-stage pipeline: instruction construction → evaluation & analysis → performance enhancement.*

---

## Four Key Findings

### 1. The Base VLM’s Language Coverage Drives the Gap

English-centric VLMs (π₀.₅, OpenVLA-OFT, Cosmos Policy) collapse on non-English instructions. Qwen-VL-based VLAs generalize much better, especially to Chinese.

| Model group | Model | Avg. drop on non-English | No-instruction baseline |
|-------------|-------|--------------------------|-------------------------|
| **English-centric** | π₀.₅ | –40.2 | –43.5 |
| | OpenVLA-OFT | –28.7 | –27.5 |
| | Cosmos Policy | –37.2 | –47.9 |
| **Multilingual** | ABot-M0 | –26.1 | –31.9 |
| | Qwen3-VL-GR00T | –28.5 | –48.0 |
| | Qwen3-VL-π | –36.1 | –55.4 |

*Table 1: Average relative performance drop on LIBERO (%). Lower is worse. English-centric models often fall to the no-instruction floor.*

### 2. Similar Visual Scenes Magnify the Gap

In LIBERO-Goal, tasks look almost identical visually, so the model must rely on language to tell them apart. This is where the multilingual gap is largest.

### 3. Preserving English Keywords Helps

Code-switching instructions (e.g., “pick up 碗”) outperform fully translated instructions (e.g., “拿起碗”) across almost all models. Key verbs and nouns carry critical semantic weight.

### 4. Action-Head Design Matters

| Action head | Multilingual performance | Reason |
|-------------|--------------------------|--------|
| **GR00T-style / π-style** | Best | Diffusion transformer retains language semantics and adapts to distribution shift |
| **OFT-style** | Moderate | MLP action head cannot fully adapt to shifted representations |
| **FAST-style** | Worst | FAST tokenizers may discard semantic information from VLM outputs |

---

## What Is Happening Under the Hood?

### Two Failure Modes

![Failure case 1: French instruction confusion](/blogs/mvla/images/fr_turn_on_the_stove.png)
*Figure 2a: Instruction misunderstanding — the French “turn on the stove” is confused with “put the bowl on the plate” in LIBERO-Goal.*

![Failure case 2: Chinese action-execution failure](/blogs/mvla/images/zh_pick_up_the_cream_cheese_and_place_it_in_the_basket.png)
*Figure 2b: Action-execution failure — the Chinese instruction is understood, but the grasp-and-place motion is wrong.*

### Representation Shift

![Embedding-space comparison](/blogs/mvla/images/pi_comparison.jpg)
*Figure 3: Average-pooled embeddings from the middle layer. Qwen3-VL-π (left) keeps English and Chinese closer; π₀.₅ (right) pushes all non-English embeddings far from English.*

Embedding distance correlates with performance: better cross-lingual alignment predicts better multilingual execution.

---

## How to Improve It: MPCA

We fine-tune on a 50K multilingual COCO-VQA dataset and compare strategies:

- **M-FT**: multilingual fine-tune the VLM, then train the action head.
- **M-CT**: co-train the VLA on multilingual COCO-VQA and LIBERO.
- **MPCA**: align multilingual instruction embeddings onto the principal-component subspace of English embeddings.

| Model | English | Chinese | French | Russian | Arabic | Avg. non-English |
|-------|---------|---------|--------|---------|--------|------------------|
| GR00T | 95.3 | 89.1 | 62.3 | 56.5 | 59.3 | 66.8 |
| M-FT | 95.4 | 87.6 | 65.1 | 57.1 | 62.8 | 68.2 |
| M-CT | 92.6 | 88.3 | 87.4 | 83.1 | 89.4 | 87.1 |
| **MPCA** | **95.3** | **90.6** | **89.5** | **85.5** | **90.8** | **89.1** |

*Table 2: Average success rate (%) across LIBERO suites. MPCA keeps English performance while lifting the non-English average by ~22 points over the baseline.*

The key idea: align only the most significant principal components and let minor components retain language-specific information.

$$
\mathcal{L} = \mathcal{L}_{\text{VLM}} + \mathcal{L}_{\text{VLA}} + \lambda \sum_{i=1}^{n} \sum_{j=1}^{m} \left(1 - \cos(\mathbf{U}^T \mathbf{h}_{i, j}, \mathbf{U}^T \mathbf{h}_{i, \text{en}})\right)
$$

---

## Takeaway

- **Multilingual VLAs are not a free lunch** — even multilingual VLM backbones can fail after language-to-action alignment.
- **The gap is explainable** through misunderstanding, execution failure, and backbone representation shift.
- **Practical takeaways**: pick a multilingual backbone, prefer diffusion action heads, keep English keywords when possible, and apply MPCA to align principal components.
