(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvDraggable', wbdvDraggableDir)
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunction(scope, element) {
            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    // console.log([startIndex, endIndex]);
                    scope.model.reorderWidget(startIndex, endIndex);
                }
            });
        }
        return {
            link: linkFunction
        }
    }

    function wbdvDraggableDir() {
        function linkFunction(scope, element) {
            element.draggable();
        }
        return {
            link: linkFunction
        }
    }

})();