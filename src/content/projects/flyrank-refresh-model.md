---
title: "Refresh Opportunity Model"
summary: "A validated ranking system that tells an analyst which of 101,441 pages to review first — built on 79 million rows of production search data."
year: "2026"
role: "FlyRank ML internship · capstone"
tech: "Python · pandas · scikit-learn"
image: "/images/projects/flyrank-report.png"
imageAlt: "The published capstone report, headed 'Which pages deserve review first?', with its abstract and table of contents."
code: "https://github.com/rashidsami10000-afk/rashid-flyrank-internship-ml-owncopy"
demo: "https://rashidsami10000-afk.github.io/rashid-flyrank-internship-ml-owncopy/"
figures:
  - src: "/images/projects/flyrank-precision.png"
    alt: "Line chart of review precision at K from 10 to 500 pages, staying between 0.89 and 1.0 against a dashed base rate of 0.48."
    caption: "Precision@K for the shipped hand rule against the 0.48 base rate. Precision decays slowly as K grows, which is what makes a ranked queue usable at 500 pages, not just at 50."
  - src: "/images/projects/flyrank-archetypes.png"
    alt: "Horizontal bar chart of queue composition by archetype: healthy pages 46,496, page-one underperformers 27,040, deep low-yield 15,880, striking-distance candidates 12,025."
    caption: "Queue composition by archetype, March 2026. Nearly half the portfolio needed no action at all — the value of the model is in ordering the other half, not in flagging everything."
slug: "flyrank-refresh-model"
---

## The problem

FlyRank's content team decides which pages get human attention through hand-written flags — quick-win tags, needs-attention markers, a composite health score. With roughly 101,000 visible page-months in the portfolio and an analyst who can review a few dozen pages a week, the binding constraint is not detection. It is ordering: which page to open first.

## What I built

I rebuilt one of those decisions on measured ground — the CTR-fix queue. About 79 million daily search-performance rows collapse into a page-month panel of 101,441 visible pages for March 2026, with the following month's outcome held back for evaluation only. The target: will this page under-capture its position tier's benchmark click-through rate next month?

The scorer is a transparent hand rule — how far a page sits below its tier benchmark, weighted by visibility:

```
score = 100 × max(0, 1 − ctr / tier_expected_ctr) × log10(impressions)
```

It ranked the queue at **P@50 = 0.92** against a 0.48 base rate. A cross-validated logistic regression measured 0.952 ± 0.033 — equal, not better — so the simpler, explainable rule shipped.

## Validation

The number that mattered most was the one that could have fooled me. Splits were grouped by client, never random, so a model could not memorise a client and then score that same client's pages. I ran a planted-leak harness: adding a single feature derived from next-month data pushed P@50 to 1.0, which is exactly how I knew to remove it. A memorisation audit compared naive against grouped splits on identical features.

## Result

A 101,441-row action queue in four batches — 11,930 P1 review, 55,170 P2 review, 16,608 human-check-first, 17,733 monitor — with reason codes on every row and monitoring triggers that fire if P@50 falls below 0.85. The queue is decision support, not automation: an analyst still opens the page.

## What I'd change

The panel is a single month pair, and the precision is saturated near the top of the queue — 12.8% of rows were dropped for having no next-month label, so the queue is honest about what survived rather than about what disappeared. I would extend to a rolling twelve-month panel and report the survivorship gap as a first-class metric instead of a footnote.
