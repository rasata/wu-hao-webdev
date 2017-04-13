/**
 * Created by wuhao on 2017-04-12.
 */
module.exports = function (app, model) {
    app.get("/aw/api/gr/:isbn/reviews", findReviewsByISBN);

    var key = "ejIk3vTLwi3vJAPx0HHgjA";

    var request = require("request");
    var parseString = require('xml2js').parseString;

    function findReviewsByISBN(req, res) {
        var isbn = req.params.isbn;
        console.log(isbn);
        baseUrl = "https://www.goodreads.com/book/isbn/ISBN?format=xml&key=KEY";
        url = baseUrl.replace("ISBN", isbn).replace("KEY", key);
        console.log(url);

        request(url, function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.

            parseString(body, function (err, result) {
                console.log("error: " + err);
                console.log("result: " + result);
                res.json(result);
            });
        });
    }
};


/*
 var parseString = require('xml2js').parseString;
 var xml = "<root>Hello xml2js!</root>"
 parseString(xml, function (err, result) {
 console.dir(result);
 });
 */