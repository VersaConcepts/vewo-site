# How to Publish a Blog Post

Adding a post to vewo.ai is three steps: create a Markdown file, push it, done. The blog index, sitemap, RSS feed, and Article schema all update automatically.

## The VEWO post standard

Every VEWO blog post follows the same format so the blog stays consistent:

1. **A boxed TL;DR** at the top — a highlighted callout summarizing the post (violet box).
2. **A custom infographic** — one brand-styled visual that explains the post's central idea.
3. The body in plain Markdown.
4. The "Back to the blog" link and audit CTA are added automatically by the layout.

**Start from the template:** copy `BLOG_TEMPLATE.md` (in the repo root) into `src/blog/posts/`, rename it, and fill it in. It already includes the TL;DR box and a placeholder for the infographic.

**Reference example:** the live post `src/blog/posts/2026-06-28-your-brand-in-the-age-of-ai.md` shows the standard in practice — see its `.blog-tldr` box and `.blog-figure` infographic.

> Handing a post to Claude? Claude reads the full post, writes the TL;DR box, and designs a fitting infographic in the brand style — then publishes it. You don't have to build the visual yourself.

## 1. Create the file

Add a new file in `src/blog/posts/`. Name it with the date and a URL-friendly slug:

```
src/blog/posts/2026-07-15-how-to-choose-an-ai-visibility-partner.md
```

The part after the date becomes the URL:
`https://vewo.ai/blog/how-to-choose-an-ai-visibility-partner/`

## 2. Add the frontmatter + body

Every post starts with this block (between the `---` lines), then the body in Markdown:

```markdown
---
title: "Your Headline Here"
description: "One or two sentences. Used for SEO, social previews, and the blog card."
date: 2026-07-15
author: "Jim Umlauf"
tags: ["posts", "AI Visibility"]
canonical: https://vewo.ai/blog/how-to-choose-an-ai-visibility-partner/
---

## First section heading

Write normally. **Bold**, *italic*, and [links](https://vewo.ai) all work.

- Bullet lists
- Like this

### Subsection

More text.
```

Field notes:
- **title** — the headline (shows on the page and the blog card).
- **description** — keep it under ~160 characters; it's the SEO + social summary.
- **date** — `YYYY-MM-DD`. Posts sort newest-first automatically.
- **author** — whoever wrote it.
- **tags** — always keep `"posts"` first (that's what groups it into the blog). The second tag (e.g. `"AI Visibility"`) shows as the category label on the card.
- **canonical** — `https://vewo.ai/blog/` + your slug + `/`.

## 3. Publish

Commit and push to GitHub `main`:

```bash
git add .
git commit -m "Add post: your headline"
git push
```

Render builds and deploys automatically (usually live in ~1–2 minutes). That's it — the post appears at its URL, on the `/blog/` index, in `sitemap.xml`, and in the RSS feed.

## Markdown cheat sheet

| You write | You get |
|-----------|---------|
| `## Heading` | Section heading |
| `### Heading` | Subsection heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `- item` | bullet list |
| `1. item` | numbered list |
| `[text](url)` | link |
| `> quote` | block quote |

## Tips

- Lead with a clear answer near the top — it helps both readers and AI engines.
- Use question-style headings where it fits ("How do I…", "What's the difference between…").
- One idea per post does better than a sprawling catch-all.
