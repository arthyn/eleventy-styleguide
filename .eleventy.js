const htmlmin = require('html-minifier');
const md = require('markdown-it');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPairedShortcode("markdown", function(content) {
		return md.renderInline(content);
	});

	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
		if( outputPath.endsWith(".html") ) {
		  let minified = htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true
		  });
		  return minified;
		}
	
		return content;
	  });

	eleventyConfig.addPassthroughCopy("static");

	return {
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk'
	}
}