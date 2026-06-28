const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Pass existing static assets straight through, untouched.
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/logo.png");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon-32.png");
  eleventyConfig.addPassthroughCopy("src/favicon-192.png");
  eleventyConfig.addPassthroughCopy("src/favicon-512.png");
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
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse()
  );

  // RSS feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/blog/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "VEWO Blog",
      subtitle: "AI Visibility Infrastructure — insights for the future of search.",
      base: "https://vewo.ai/",
      author: { name: "VEWO" },
    },
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
