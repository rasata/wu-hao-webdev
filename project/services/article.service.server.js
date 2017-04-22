/**
 * Created by wuhao on 2017-04-11.
 */
/**
 * Created by wuhao on 2017-03-26.
 */
module.exports = function (app, model) {
    app.post("/aw/api/book/:bookId/article", createArticle);
    app.get("/aw/api/article/:articleId", findArticleById);
    app.get("/aw/api/book/:bookId/article", findAllArticlesForBook);
    app.get("/aw/api/article/popular/:amount", findPopularArticles);
    app.put("/aw/api/article/:articleId", updateArticle);
    app.delete("/aw/api/article/:articleId", deleteArticle);
    app.get("/aw/api/article", findArticles);

    function findAllArticlesForBook(req, res) {
        var bookId = req.params.bookId;

        model.ArticleModel
            .findArticlesForBook(bookId)
            .then(
                function (articles) {
                    res.json(articles);
                },
                function (err) {
                    res.status(500).send(err);
                }
            )
    }

    function findArticles(req, res) {
        var authorId = req.query.authorId;

        if (authorId) {
            findArticlesByAuthorId(req, res);
        }
    }

    function findPopularArticles(req, res) {
        var amount = req.params.amount;
    }

    function findArticlesByAuthorId(req, res) {
        var authorId = req.query.authorId;
        console.log("find articles by author ID");

        model.ArticleModel
            .findArticlesByAuthorId(authorId)
            .then(
                function (response) {
                    res.send(response);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function createArticle(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.bookId;
        var newArticle = req.body;


        model.ArticleModel
            .createArticle(bookId, newArticle)
            .then(function (article) {
                res.send(article);

                noticingSubscribers(bookId);
            });
    }

    function updateArticle(req, res) {
        var articleId = req.params.articleId;
        var newArticle = req.body;

        model.ArticleModel
            .updateArticle(articleId, newArticle)
            .then(
                function (status) {
                    res.sendStatus(200);

                    model.ArticleModel.findArticleById(articleId)
                        .then(function (foundArticle) {
                            var bookId = foundArticle._book;
                            console.log("updating a new article, sending notice to all subscribers");
                            noticingSubscribers(bookId);
                        });
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function noticingSubscribers(bookId) {
        // sending notices to readers who follows the book that there's an update
        // model.BookModel.findBookById(bookId)
        //     .then(function (foundBook) {
        //         console.log("found book subs");
        //         console.log(JSON.stringify(foundBook));
        //         var subs = foundBook["subscribers"];
        //
        //         if (subs) {
        //             for (var count = 0; count < subs.length; count++) {
        //                 //    TODO: update subscription
        //                 console.log("noticing user: " + subs[count]);
        //                 model.UserModel.updateSubscription(subs[count], bookId, true)
        //                     .then(function (user) {
        //                         console.log("updated user: " + JSON.stringify(user));
        //                     });
        //             }
        //         }
        //     });
    }

    function findArticleById(req, res) {
        var articleId = req.params.articleId;

        model.ArticleModel
            .findArticleById(articleId)
            .then(
                function (response) {
                    res.send(response);
                })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function deleteArticle(req, res) {
        var articleId = req.params.articleId;

        model.ArticleModel
            .deleteArticle(articleId)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};