const fs = require("node:fs");
const path = require("node:path");

const pugPlugin = require("@11ty/eleventy-plugin-pug").default;
const Typograf = require("typograf");

// Типографика применяется на сборке: в src лежит обычный текст,
// в _site уезжает уже с неразрывными пробелами и правильными знаками.
const typograf = new Typograf({ locale: ["ru", "en-US"] });

typograf.addSafeTag("<pre>", "</pre>");
typograf.addSafeTag("<code>", "</code>");

// Многоточие оставляем тремя точками
typograf.disableRule("common/punctuation/hellip");

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

  eleventyConfig.addTransform("typograf", (content, outputPath) =>
    outputPath && outputPath.endsWith(".html") ? typograf.execute(content) : content
  );

  return {
    dir: { input: "src", output: "_site" },
  };
};