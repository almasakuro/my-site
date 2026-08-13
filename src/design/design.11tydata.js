const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  layout: "base.pug",

  eleventyComputed: {
    // Баннер для превью в мессенджерах — берётся из папки кейса, если он там лежит
    banner: (data) => {
      const dir = path.dirname(data.page.inputPath);
      const file = fs.readdirSync(dir).find((f) => f.startsWith("banner."));

      return file ? data.page.url + file : null;
    },
  },
};
