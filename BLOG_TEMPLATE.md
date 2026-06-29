<!--
  VEWO BLOG POST TEMPLATE
  ----------------------------------------------------------------------
  Copy this file into  src/blog/posts/  and rename it:
      src/blog/posts/YYYY-MM-DD-your-url-slug.md
  The part after the date becomes the URL:
      https://vewo.ai/blog/your-url-slug/

  EVERY VEWO post follows the same shape:
    1. Frontmatter (below)
    2. A boxed TL;DR  (the <aside class="blog-tldr"> block)
    3. A custom infographic  (the <figure class="blog-figure"> block)
       — chosen to fit THIS post's main idea (see notes by the figure)
    4. The body, in plain Markdown

  The TL;DR box and figure use styles already in src/styles.css
  (.blog-tldr and .blog-figure) — no CSS changes needed per post.

  Raw-HTML blocks (the <aside> and <figure>) MUST start flush at the
  left margin with a blank line before and after, or Markdown will
  not pass them through correctly.
  Delete this comment block before publishing.
-->
---
title: "Your Headline Here"
description: "One or two sentences. Used for SEO, social previews, and the blog card. Keep under ~160 characters."
date: 2026-07-01
author: "Jim Umlauf"
tags: ["posts", "Category Name"]
canonical: https://vewo.ai/blog/your-url-slug/
---

<aside class="blog-tldr">
<h2>TL;DR</h2>
<p>One short paragraph summarizing the whole post — the core takeaway a busy reader needs. Then, if useful, the key moves:</p>
<ul>
<li>First key point.</li>
<li>Second key point.</li>
<li>Third key point.</li>
</ul>
</aside>

## First section heading

Write the opening here. Lead with a clear, direct point — it helps both readers and AI engines.

## Second section heading

More body content. Use `## ` for sections and `### ` for subsections.

<figure class="blog-figure">
<!--
  INFOGRAPHIC GOES HERE.
  Place it where the post's central idea lands (often after the
  problem is framed, before the solution). One strong visual per post.

  Paste an inline <svg viewBox="0 0 760 360" ...> ... </svg> here.
  Guidelines so it matches the brand:
    • Use the gradient:   <linearGradient> stops #6d4aff → #4f7df0 → #0fa9c4
    • Fonts: font-family="Poppins, sans-serif"
    • Text colors: #0e0f1a (dark), #545569 (muted), #82839a (light)
    • Card/node fills #fff with stroke #e3e4ef; highlight the key node
      with stroke #6a3fff (the brand violet)
    • Keep it simple: nodes + arrows that explain ONE concept
  Then write a one-sentence <figcaption> tying it back to the point.
-->
<figcaption>One sentence explaining the visual and tying it to the section's point.</figcaption>
</figure>

## Third section heading

Continue the body. Bullets, **bold**, *italic*, [links](https://vewo.ai), and > quotes all work.

## Conclusion

Close with the takeaway and, ideally, a forward-looking line. The "Back to the blog" link and the audit CTA are added automatically by the post layout — you don't need to add them.
