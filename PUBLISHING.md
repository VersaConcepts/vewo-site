# How to Publish a Blog Post

Adding a post to vewo.ai is three steps: create a Markdown file, push it, done. The blog index, sitemap, RSS feed, and Article schema all update automatically.

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
