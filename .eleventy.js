// Images
const Image = require("@11ty/eleventy-img");

const ImageWidths = {
  ORIGINAL: null,
  PLACEHOLDER: 24,
};


async function imageShortcode(
  src, 
  alt, 
  className = "blog-visual",
  widths = [400,800,1200],
  baseFormat='jpeg',
  optimizedFormats=['webp'],
  sizes='25%') {
  
    if(alt === undefined) {
    // throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [ImageWidths.ORIGINAL,ImageWidths.PLACEHOLDER,...widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir: "public/assets/images",
    urlPath: "/assets/images"
  });

  const attributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async", 
  }
  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img class="${className}" src="${data.url}" alt="${alt}" loading="lazy" decoding="async">`;
}


module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");
  eleventyConfig.addPassthroughCopy("./src/scripts");
  eleventyConfig.addWatchTarget("./src/scripts/");

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
