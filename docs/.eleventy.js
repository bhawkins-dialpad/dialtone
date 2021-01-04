const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginTOC = require("eleventy-plugin-nesting-toc");

module.exports = function(eleventyConfig) {
    //  Add syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addLayoutAlias('page', 'layouts/page.html');

    // Copy assets over
    eleventyConfig.addPassthroughCopy('assets/css');
    eleventyConfig.addPassthroughCopy('assets/fonts');
    eleventyConfig.addPassthroughCopy('assets/images');
    eleventyConfig.addPassthroughCopy('assets/js');

    //  Icon shortcode
    //  Re-used (with love) from Stack Overflow's Stacks. Extended for our purposes
    eleventyConfig.addLiquidShortcode("iconSystem", function(name, classes, dimension) {
        var fs = require("fs");
        var path = "_includes/icons/system/" + name + ".svg";
        var svg = fs.readFileSync(path).toString("utf-8");
        var defaultClasses = "d-svg d-svg--system";

        // If we have classes, add them
        if (classes != null) {
            svg = svg.replace(defaultClasses, defaultClasses + " " + classes);
        }

        // If we need to change the size, do that too
        if (dimension != null) {
            svg = svg.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" width="' + dimension + 'px"');
        }

        return svg;
    });
    eleventyConfig.addLiquidShortcode("iconBrand", function(name, classes, dimension) {
        var fs = require("fs");
        var path = "_includes/icons/brand/" + name + ".svg";
        var svg = fs.readFileSync(path).toString("utf-8");
        var defaultClasses = "d-svg__" + name;

        // If we have classes, add them
        if (classes != null) {
            svg = svg.replace(defaultClasses, defaultClasses + " " + classes);
        }

        // If we need to change the size, do that too
        if (dimension != null) {
            svg = svg.replace('viewBox="0 0 24 24"', 'viewBox="0 0' + dimension + dimension + '"');
        }

        return svg;
    });
    eleventyConfig.addLiquidShortcode("pattern", function(name, classes, dimension) {
        var fs = require("fs");
        var path = "_includes/patterns/" + name + ".svg";
        var svg = fs.readFileSync(path).toString("utf-8");
        var defaultClasses = "d-svg__" + name;

        // If we have classes, add them
        if (classes != null) {
            svg = svg.replace(defaultClasses, defaultClasses + " " + classes);
        }

        // If we need to change the size, do that too
        if (dimension != null) {
            svg = svg.replace('viewBox="0 0 24 24"', 'viewBox="0 0' + dimension + dimension + '"');
        }

        return svg;
    });

    //  Generate header areas with anchor links
    eleventyConfig.addLiquidShortcode("header", function(tag, text) {
        var slug = text.replace(/\s+/g, '-').toLowerCase();
        var output = '';

        output += '<div class="d-d-flex d-jc-space-between d-ai-end d-pe-none">';
        if (tag == 'h2') {
            output +=   '<' + tag + ' class="d-fl1 d-headline24 js-scrollspy" id="'+ slug +'">';
        }
        if (tag == 'h3') {
            output +=   '<' + tag + ' class="d-fl1 d-headline20 js-scrollspy" id="'+ slug +'">';
        }
        output +=       '<span class="d-pe-auto">' + text + '</span>';
        output +=   '</' + tag + '>';
        output +=   '<a class="d-btn d-btn--muted d-pe-auto" href="#'+ slug +'">';
        output +=       '<span class="d-btn__icon d-m0 d-ai-center"><svg aria-hidden="true" aria-label="Link" class="d-svg d-svg--system d-svg__link" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span>';
        output +=   '</a>'
        output += '</div>';

        return output;
    });

    //  Add submenu navigation
    eleventyConfig.addPlugin(pluginTOC, {tags: ['h2', 'h3']});


    return {
        dir: {
            css: "assets/css"
        }
    }
}
