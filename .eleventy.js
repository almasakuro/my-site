const pugPlugin = require("@11ty/eleventy-plugin-pug").default;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pugPlugin);
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addWatchTarget("src/css/");

  return {
    dir: { input: "src", output: "_site" },
  };
};