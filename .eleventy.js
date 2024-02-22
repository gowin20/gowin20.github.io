// Images
const Image = require("@11ty/eleventy-img");
const CleanCSS = require('clean-css')

const ImageWidths = {
  ORIGINAL: null,
  PLACEHOLDER: 24,
};

async function captionShortcode (text) {
  return `<em class="caption">${text}</em>`;
}

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
  eleventyConfig.addPassthroughCopy("./src/CNAME");

  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.addPassthroughCopy("./src/projects");
  eleventyConfig.addWatchTarget("./src/projects/");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);


  eleventyConfig.addNunjucksAsyncShortcode("caption", captionShortcode);
  eleventyConfig.addLiquidShortcode("caption", captionShortcode);
  eleventyConfig.addJavaScriptFunction("caption", captionShortcode);

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

  // CSS minifier
  eleventyConfig.addFilter('cssMin', css => {
    return new CleanCSS({}).minify(css).styles;
  });


  // Tag-related filters
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});


  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    cname: 'geowen.dev'
  };
};
