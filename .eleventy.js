module.exports = function(eleventyConfig) {
  // zkopíruj CSS a obrázky do dist/
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/videos");
    eleventyConfig.addPassthroughCopy("src/js");


  return {
    dir: {
      input: "src",      // zdrojové soubory
      includes: "_includes", // šablony (pozor: tady už NEDÁVÁME ../)
      data: "_data",         // data složka
      output: "dist"         // výstup
    }
  };
};
