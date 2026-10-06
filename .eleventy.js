const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Pass existing static assets straight through, untouched.
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/logo.png");
  eleventyConfig.addPassthroughCopy("src/logo-footer.png");
  eleventyConfig.addPassthroughCopy("src/logo.webp");
  eleventyConfig.addPassthroughCopy("src/logo-footer.webp");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/favicon-32.png");
  eleventyConfig.addPassthroughCopy("src/favicon-192.png");
  eleventyConfig.addPassthroughCopy("src/favicon-512.png");
  eleventyConfig.addPassthroughCopy("src/og-image.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // The homepage is hand-authored HTML — copy it verbatim, don't template it.
  eleventyConfig.addPassthroughCopy("src/index.html");

  // Date helpers for templates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  });
  eleventyConfig.addFilter("isoDate", (dateObj) => new Date(dateObj).toISOString());
  eleventyConfig.addFilter("yyyymmdd", (dateObj) => new Date(dateObj).toISOString().slice(0, 10));

  // Collection of all blog posts, newest first
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob(["src/blog/posts/*.md", "src/blog/posts/*.njk"]).reverse()
  );

  // RSS feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/blog/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "VEWO Blog",
      subtitle: "AI Visibility Infrastructure: insights for the future of search.",
      base: "https://vewo.ai/",
      author: { name: "VEWO" },
    },
  });

  // Cache busting: every page links styles.css and script.js with ?v=<content hash>, so browsers may keep them for a
  // year and still get a new version the moment either file changes (the cache headers live in render.yaml).
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const out = dir.output;
    const hashOf = (f) => crypto.createHash("sha256").update(fs.readFileSync(path.join(out, f))).digest("hex").slice(0, 10);
    const versions = { "styles.css": hashOf("styles.css"), "script.js": hashOf("script.js") };
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
    for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
      const html = fs.readFileSync(file, "utf8");
      const next = html.replace(/((?:href|src)="\/?)(styles\.css|script\.js)"/g, (_, pre, name) => `${pre}${name}?v=${versions[name]}"`);
      if (next !== html) fs.writeFileSync(file, next);
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
