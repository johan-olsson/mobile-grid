'use strict';

angular.module('app.game')

/**
 * @author: Martin Milesich
 *
 * TODO: If we implement removal of games, we can 
 *       recalculate all items
 */
.directive('grid', function() {
    return {
        restrict: 'EA',
        template: '<div class="grid"><div class="inner" ng-transclude></div></grid>',
        transclude: true,
        replace: true,
        controller: function() {

            var items = [];

            /**
             * To determine if the item should be pulled right
             */
            this.calculate = function() {

                var left  = 0;
                var right = 0;

                angular.forEach(items, function(item) {

                    var cols = parseInt(item.cols, 10);
                    var rows = parseInt(item.rows, 10);
                    var inc  = Math.max(cols, rows);

                    if (cols === 2) {
                        left = right = 0;
                    } else if (left <= right) {
                        left += inc;
                    } else {
                        right += inc;
                        if (rows === 2) {
                            item.pullRight = true;
                        }
                    }

                });
            };

            this.add = function(scope) {
                items.push(scope);
            };

            this.remove = function(scope) {
                items = _.without(items, scope);
            };

        }
    };
})

.directive('gridItem', function() {
    return {
        require: '^grid',
        restrict: 'EA',
        scope: {
            cols: '@',
            rows: '@',
            last: '@'
        },
        template: '<div class="grid-item cols-{{cols}} rows-{{rows}}" ng-class="{\'pull-right\': pullRight}" ng-transclude></div>',
        transclude: true,
        replace: true,
        link: function(scope, element, attrs, gridCtrl)
        {
            gridCtrl.add(scope);
            
            if (scope.last) {
                gridCtrl.calculate();
            }

            // Cleanup
            scope.$on('destroy', function() {
                gridCtrl.remove(scope);
                gridCtrl.calculate();
            });

        }
    };
});

