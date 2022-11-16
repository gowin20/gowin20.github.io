// Images
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, className = undefined, widths = [400,800,1200], formats=['webp','jpeg'],sizes='100vw') {
  if(alt === undefined) {
    // throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [...widths,null],
    formats: [...formats, null],
    outputDir: "public/assets/images",
    urlPath: "/assets/images"
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}">`;
}

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

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
      markdownTemplateEngine: "md"
    },
  };
};
