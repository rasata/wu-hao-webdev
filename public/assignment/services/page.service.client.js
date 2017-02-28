/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        // createPage(websiteId, page) - adds the page parameter instance to the local pages array.
        // The new page's websiteId is set to the websiteId parameter
        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId +"/page", page);
        }

        // findPageByWebsiteId(websiteId) -
        // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }

        // findPageById(pageId) - retrieves the page in local pages array whose _id matches the pageId parameter
        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        // { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        // updatePage(pageId, page) - updates the page in local pages array whose _id matches the pageId parameter
        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

        // deletePage(pageId) - removes the page from local pages array whose _id matches the pageId parameter
        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }
})();