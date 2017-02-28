module.exports = function (app) {
    app.post("/api/user/:userId/website", findAllWebsites);
    app.get("/api/user/:userId/website");
    app.get("/api/website/:websiteId");
    app.put("/api/website/:websiteId");
    app.delete("/api/website/:websiteId");

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

    function findAllWebsites(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
};