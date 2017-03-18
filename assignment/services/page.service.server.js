module.exports = function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        // /api/website/:websiteId/page
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        model.PageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        // /api/website/:websiteId/page
        var websiteId = req.params.websiteId;

        model.PageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function findPageById(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;

        model.PageModel
            .findPageById(pageId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function updatePage(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;
        var newPage = req.body;

        model.PageModel
            .updatePage(pageId, newPage)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function deletePage(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;

        model.PageModel
            .deletePage(pageId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};