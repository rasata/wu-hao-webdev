module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        // /api/user/:userId/website
        var userId = req.params.userId;
        var newWebsite = req.body;

        model.WebsiteModel
            .createWebsite(userId, newWebsite)
            .then(
                function (website) {
                    res.send(website);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        // /api/user/:userId/website
        var userId = req.params.userId;

        model.WebsiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function findWebsiteById(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;

        model.WebsiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function updateWebsite(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

        model.WebsiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function deleteWebsite(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;
        model.WebsiteModel
            .deleteWebsite(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};