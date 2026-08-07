const fs = require("node:fs");
const path = require("node:path");

const pugPlugin = require("@11ty/eleventy-plugin-pug").default;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pugPlugin);
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/**/*.{png,jpg,jpeg,gif,svg,webp,avif,mp4,webm,mov}");

  eleventyConfig.addWatchTarget("src/css/");

  eleventyConfig.addCollection("projects", (api) =>
    api
      .getFilteredByGlob("./src/design/*/index.pug")
      .map((project) => {
        const dir = path.dirname(project.inputPath);
        const cover = fs.readdirSync(dir).find((f) => f.startsWith("cover."));

        project.data.cover = cover ? project.url + cover : null;

        return project;
      })
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", output: "_site" },
  };
};