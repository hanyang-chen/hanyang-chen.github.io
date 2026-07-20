---
layout: post
title: "DADiff: Diffusion-Driven Cross-Domain Policy Adaptation for Reinforcement Learning"
date: 2026-07-14
permalink: /blogs/dadiff/
authors: "Hanyang Chen, Anirudh Satheesh, Longchao Da, Hua Wei"
venue: "IROS 2026"
summary: "We introduce DADiff, a diffusion-based framework for online dynamics adaptation in reinforcement learning that measures dynamics mismatch through generative trajectory deviation."
---

> **Authors**: Hanyang Chen, Anirudh Satheesh, Longchao Da, Hua Wei  
> **Affiliation**: Arizona State University, University of Maryland, College Park  
> **Conference**: IROS 2026  
> **Links**: [Paper](https://www.alphaxiv.org/abs/2607.16090) · [Code](https://github.com/hanyang-chen/DADiff-release)

---

## TL;DR

We introduce **DADiff**, a diffusion-based framework for online dynamics adaptation in reinforcement learning. By treating state transitions as conditional generative processes, DADiff measures the dynamics mismatch between source and target domains through the deviation of their **generative trajectories** in a diffusion model. We theoretically bound the policy performance gap by this trajectory deviation, and derive two practical SAC variants: **DADiff-modify**, which penalizes source rewards by the deviation, and **DADiff-select**, which filters source transitions by it. On 16 cross-domain MuJoCo tasks spanning kinematic, morphology, friction, and gravity shifts, DADiff achieves strong and stable performance, matches or exceeds the strongest baselines, and remains more robust to stochastic dynamics than prior representation-learning methods.

---

## Motivation: The Sim-to-Real Dynamics Mismatch Problem

Reinforcement learning has shown impressive results in complex decision-making tasks, but training policies directly in the real world is often expensive, unsafe, or sample-constrained. A common alternative is to train in a simulator, i.e., the *source domain*, and transfer the policy to the real world, i.e., the *target domain*. Unfortunately, the two domains rarely share identical transition dynamics. Joint ranges, limb sizes, friction coefficients, and gravity can all differ. This **dynamics mismatch** causes severe performance degradation when a policy is transferred naively.

Existing online dynamics adaptation methods tackle this problem from several angles:

- **Domain classifiers** (e.g., DARC) provide coarse binary or scalar signals of domain difference.
- **Value-guided filtering** (e.g., VGDF) relies on learning a forward dynamics model, which is computationally expensive.
- **Representation learning** (e.g., PAR) assumes an invariant latent structure across domains, which can fail in stochastic settings.

These limitations motivate a more fine-grained and distributional way to measure how the source and target dynamics differ.

---

## Our Approach: Viewing Transitions as Generative Trajectories

Diffusion models, such as DDPM, generate data through a reverse denoising process that forms a trajectory from pure noise $x_K$ to a clean sample $x_0$. We bring this perspective to state transitions: given a state-action pair $(s, a)$, the next state $s'$ can be viewed as being generated step-by-step through a sequence of latent states:

$$s'_K \rightarrow s'_{K-1} \rightarrow \dots \rightarrow s'_1 \rightarrow s'_0 = s'.$$

We call this sequence a **generative trajectory**. If the source and target domains have different dynamics, their generative trajectories will diverge. We term this divergence the **generative trajectory deviation** and use it as a fine-grained signal of dynamics mismatch.

### Theoretical Guarantee

We prove that the performance gap of any policy $\pi$ between the source and target domains is bounded by the discrepancy between their generative trajectories:

$$\eta_{\mathcal{M}_\mathrm{src}}(\pi) - \eta_{\mathcal{M}_\mathrm{tar}}(\pi) \; \le \; \frac{\sqrt{2}\gamma r_\mathrm{max}}{(1-\gamma)^2} \, \mathbb{E}_{\rho_\mathrm{src}^\pi}\!\left[ \sqrt{\mathbb{E}_{P_\mathrm{src}}\!\left[ \sum_{k=1}^{K} D_\mathrm{KL}\big(P_\mathrm{src}(s'_{k-1} \mid s'_k, s, a) \,\|\, P_\mathrm{tar}(s'_{k-1} \mid s'_k, s, a)\big) \right]} \right].$$

This bound tells us:

> If the generative trajectories are similar, the policy performs similarly in both domains; if they diverge, the performance gap grows.

### Algorithm

In practice, we train a conditional noise model $\epsilon^\theta_\mathrm{tar}(s'_k, s, a, k)$ on limited target-domain data using the standard DDPM objective. For any source-domain transition $(s, a, s')$, we estimate the generative trajectory deviation as:

$$d(s,a,s') = \sum_{k=1}^{K} \frac{\beta_k}{2(1-\bar{\alpha}_{k-1})\alpha_k} \, \big\| \epsilon - \epsilon^\theta_\mathrm{tar}(\sqrt{\bar{\alpha}_k} s'_0 + \sqrt{1-\bar{\alpha}_k}\, \epsilon,\, s, a, k) \big\|^2, \quad \epsilon \sim \mathcal{N}(0, I).$$

We then use this deviation in two complementary SAC-based variants:

- **DADiff-modify** penalizes source-domain rewards:
  $$r_\mathrm{mod}(s,a,s') = r(s,a,s') - \lambda \, d(s,a,s').$$
  The modified rewards push the value function to prefer source transitions that are close to the target dynamics.

- **DADiff-select** filters each source batch and keeps only the $\xi\%$ of transitions with the smallest deviation:
  $$\omega(s,a,s') = \mathbb{1}\big\{d(s,a,s') < d_{\xi\%}\big\}.$$
  These selected transitions are then mixed with target-domain data for value updates.

Both variants share the same actor objective and can be selected based on task characteristics.

---

## Key Results

We evaluate DADiff on 16 cross-domain tasks built from the Gym MuJoCo **ant**, **hopper**, **halfcheetah**, and **walker** environments. We consider four types of shifts:

- **Kinematic shifts** (restricted joint ranges)
- **Morphology shifts** (reduced limb sizes)
- **Friction shifts** (modified friction coefficients)
- **Gravity shifts** (altered gravitational acceleration)

Baselines include DARC, VGDF, PAR, SAC-IW, SAC-tune, SAC-tar, and an Oracle trained with 1M target-domain steps.

### Main Findings

- **Strong and consistent performance.** DADiff achieves the best or second-best results on the majority of tasks, while other methods fluctuate significantly across shift types.
- **DADiff-modify improves by 8.7% on average**, with a maximum improvement of **42.3%** on *halfcheetah (broken back thigh)* over the best baseline.
- **DADiff-select is fast and effective.** In tasks where reward modification struggles (*halfcheetah (no thighs)*, *hopper (big head)*, *hopper (friction)*), DADiff-select matches the strong model-based baseline VGDF while avoiding its **3$\times$ longer training time**.
- **Robustness to stochastic dynamics.** When action noise is injected to simulate stochastic environments, PAR's performance drops by up to **45.17%**, whereas DADiff-modify remains much more stable.

<div align="center">
  <img src="/blogs/dadiff/images/overall_performance.jpg" width="95%"/>
  <p><em>Adaptation performance across 16 cross-domain tasks. DADiff consistently outperforms or matches the strongest baselines.</em></p>
</div>

### Robustness to Stochastic Dynamics

A key advantage of DADiff over representation-learning methods is that it does not require a one-to-one mapping between states and their latent representations. We validate this by injecting action noise with increasing standard deviation $\varsigma$ into two kinematic-shift tasks: *hopper (broken joints)* and *walker (broken right foot)*.

The results are striking. PAR, which relies on a one-to-one representation assumption, degrades by up to **45.17%** as stochasticity increases. In contrast, **DADiff-modify remains largely stable**, confirming that measuring dynamics mismatch through generative trajectories is much more robust in stochastic settings.

| Environment | $\varsigma$ | DADiff-modify | PAR |
|-------------|-------------|---------------|-----|
| hopper (broken joints) | 0.00 | 2582.1 | **2623.1** |
| hopper (broken joints) | 0.03 | **2574.2** (–0.31%) | 2406.1 (–8.27%) |
| walker (broken right foot) | 0.00 | **3390.4** | 2943.3 |
| walker (broken right foot) | 0.03 | **3176.8** (–6.30%) | 1613.9 (–45.17%) |

We also find a theoretical connection between DADiff and PAR. PAR can be recovered as a special case of our framework with $K=1$ latent state, but that special case loses robustness when the one-to-one representation assumption breaks.

---

## Reward Distribution Analysis

<div align="center">
  <img src="/blogs/dadiff/images/parameter_study_reward.jpg" width="95%"/>
  <p><em>Reward distribution comparison between the source-domain rewards before processing (Original) and after modification or selection (Processed).</em></p>
</div>

We further examine the reasons behind the superior performance of DADiff-select, in contrast to the severe failure of DADiff-modify on *halfcheetah (no thighs)* and *hopper (big head)* tasks, as illustrated in the overall performance figure above. Specifically, we analyze the reward distributions of source-domain data after modification or selection. The results are presented in the figure above. We find that DADiff-select generates a higher distribution in the low-reward region compared to DADiff-modify on both tasks. This suggests that the low-reward data may play a crucial role in these tasks, which can effectively guide the policy to avoid undesirable states and actions.

---

## Takeaway

> **By viewing state transitions as generative trajectories and measuring their deviation through diffusion models, DADiff offers a fine-grained, theoretically grounded, and practically effective way to handle sim-to-real dynamics mismatch.**

DADiff bridges theory and algorithm design: the same generative-trajectory deviation that appears in our performance bound is also what we estimate and exploit in training. The two variants give us flexibility across tasks with different mismatch characteristics.
