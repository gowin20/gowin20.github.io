module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.addCollection("quotes", collectionAPI => {
    const quoteArr = collectionAPI.getFilteredByGlob("./src/blog/*.md");
    return quoteArr.map(q => q.data.quote).filter(Boolean);
  });

  eleventyConfig.addCollection("latestPosts", collectionAPI => {
    return collectionAPI.getFilteredByTag("posts").sort(function(a,b){
      return b.date-a.date;
    }).slice(0,3);
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