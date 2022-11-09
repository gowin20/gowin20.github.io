module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.addCollection("quotes", collectionAPI => {
    const quoteArr = collectionAPI.getFilteredByGlob("./src/blog/*.md");
    return quoteArr.map(q => q.data.quote).filter(Boolean);
  });

  eleventyConfig.addFilter("randomItem",(arr)=>{
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr[0];
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};