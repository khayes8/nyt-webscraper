// jslint node: true;

var cheerio = require("cheerio");
var request = require("request");
// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from history channels's news page:" +
            "\n***********************************\n");

request("https://www.theonion.com/", function(error, response, html) {
  var $ = cheerio.load(html);
  // An empty array to save the data that we'll scrape
  var results = [];
  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $(".post-wrapper").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).text().replace(/(\t\n|\t|\n)/gm,"");
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");
    //^^^ JS currently recognixes this variable but cannot defined it
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});