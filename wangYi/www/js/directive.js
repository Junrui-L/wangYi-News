/**
 * Created by htzhanglong on 2015/8/30.
 */
/**
 * Created by htzhanglong on 2015/8/2.

ion-view  hide-tabs

 */
var directiveMod=angular.module("starter.directive", []);


directiveMod.directive('hideTabs',function($rootScope){
    return {
        restrict:'AE',
        link:function($scope){


            console.log(1111);
            $scope.$on('$ionicView.beforeEnter', function() {
                $rootScope.hideTabs = 'tabs-item-hide';

                console.log('tabs-item-hide');

            });
            $scope.$on('$destroy',function(){
                $rootScope.hideTabs = '';
                console.log('no-tabs-item-hide');

            })
        }
  } })


