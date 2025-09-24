// .eleventy.js
export default function(eleventyConfig) {
  // zkopíruj statické soubory do dist/
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/videos");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    dir: {
      input: "src",         // zdrojové soubory
      includes: "_includes", // šablony
      data: "_data",         // složka pro data
      output: "dist"         // výstup
    }
  };
}
