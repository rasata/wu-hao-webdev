/**
 * Created by wuhao on 2017-02-11.
 */
/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular.module("WebAppMaker").factory("PageService", PageService);

    function PageService() {
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

        // createPage(websiteId, page) - adds the page parameter instance to the local pages array.
        // The new page's websiteId is set to the websiteId parameter
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        // findPageByWebsiteId(websiteId) -
        // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
        function findPageByWebsiteId(websiteId) {
            ret = [];
            for(var p in pages) {
                if (pages[p].websiteId == websiteId) {
                    ret.push(pages[p]);
                }
            }
            return ret;
        }

        // findPageById(pageId) - retrieves the page in local pages array whose _id matches the pageId parameter
        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id == pageId)
                    return pages[p];
            }
            return null;
        }

        // updatePage(pageId, page) - updates the page in local pages array whose _id matches the pageId parameter
        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id == pageId)
                    pages[p] = page;
            }
        }

        // deletePage(pageId) - removes the page from local pages array whose _id matches the pageId parameter
        function deletePage(pageId) {
            for (var i = 0; i < pages.length; ++i) {
                if (pages[i]._id == pageId)
                    pages.splice(i, 1);
            }
        }
    }
})();