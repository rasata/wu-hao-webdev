module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    // app.get("/api/user", findUser);
    // app.get("/api/user/:userId", findUserById);
    // app.put("/api/user/:userId", updateUser);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        // /api/user/:userId/website
        var userId = req.params.userId;
        var newWebsite = req.body;

        if(newWebsite == null) {
            res.status(500).send("The given website is empty");
            return;
        }

        for(var w in websites) {
            if (websites[w].name == newWebsite.name) {
                res.status(500).send("");
                return;
            }
        }

        newWebsite.developerId = userId;
        newWebsite._id = (new Date()).getTime();
        websites.push(newWebsite);
        res.sendStatus(200);
    }

    function findAllWebsitesForUser(req, res) {
        // /api/user/:userId/website
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;

        for (var w in websites) {
            if(websites[w]._id == websiteId) {
                // return angular.copy(websites[w]);
                res.json(websites[w]);
                return;
            }
        }
        res.status(500).send("Could not find the website.");
    }

    function updateWebsite(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = newWebsite.name;
                websites[w].developerId = newWebsite.developerId;
                websites[w].description = newWebsite.description;

                res.json(websites[w]);
                return;
            }
        }
        res.status(500).send("Could not find the website.");
    }

    function deleteWebsite(req, res) {
        // /api/website/:websiteId
        var websiteId = req.params.websiteId;

        for (var i = 0; i < websites.length; ++i) {
            if(websites[i]._id == websiteId) {
                websites.splice(i ,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(500).send("Could not find the website.");
    }
};