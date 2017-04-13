/**
 * Created by wuhao on 2017-04-12.
 */
module.exports = function (app, model) {
    app.get("/aw/api/gr/:isbn/reviews", findReviews);


    function findReviews(req, res) {
        var isbn = req.params.isbn;
        console.log(isbn);
    }
};