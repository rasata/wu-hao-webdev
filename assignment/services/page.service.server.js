module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        // /api/website/:websiteId/page
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        if(newPage == null) {
            res.status(500).send("The given page is empty");
            return;
        }

        for(var p in pages) {
            if (pages[p].name == newPage.name) {
                res.status(500).send("The page name is taken.");
                return;
            }
        }
        newPage.websiteId = websiteId;
        newPage.developerId = userId;
        newPage._id = (new Date()).getTime();
        pages.push(newPage);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        // /api/website/:websiteId/page
        var websiteId = req.params.websiteId;

        ret = [];
        for(var p in pages) {
            if (pages[p].websiteId == websiteId) {
                ret.push(pages[p]);
            }
        }
        res.json(pages);
    }

    function findPageById(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;

        // for (var p in pages) {
        //     if (pages[p]._id == pageId)
        //         return angular.copy(pages[p]);
        // }
        // return null;
    }

    function updatePage(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;

        // for (var p in pages) {
        //     if (pages[p]._id == pageId) {
        //         pages[p].name = page.name;
        //         pages[p].websiteId = page.websiteId;
        //         pages[p].description = page.description;
        //         return pages[p];
        //     }
        // }
        // return null;
    }

    function deletePage(req, res) {
        // /api/page/:pageId
        var pageId = req.params.pageId;

        // for (var i = 0; i < pages.length; ++i) {
        //     if (pages[i]._id == pageId) {
        //         pages.splice(i, 1);
        //         return true;
        //     }
        // }
        // return false;
    }
};