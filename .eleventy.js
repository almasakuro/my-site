const pugPlugin = require("@11ty/eleventy-plugin-pug").default;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pugPlugin);
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    dir: { input: "src", output: "_site" },
  };
};