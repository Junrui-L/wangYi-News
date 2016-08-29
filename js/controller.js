/**
 * Created by Administrator on 2016/8/27 0027.
 */
angular.module('myApp.controller', ['myApp.services'])
    .controller('newsController', function ($scope, $rootScope, $state, $ionicSlideBoxDelegate,$timeout,newsServices) {

        $timeout(function () {

            $scope.items = [
                'img/slide1.jpg',
                'img/slide2.jpg',
                'img/slide3.jpg',
                'img/slide4.jpg',
                'img/slide5.jpg'

            ];
            $ionicSlideBoxDelegate.update();      //更新ionic SlideBox
            $ionicSlideBoxDelegate.$getByHandle("slideBox").loop(true);

        }, 300);

        /*接收显示数据*/
        $scope.$on('$ionicView.beforeEnter', function () {
            $rootScope.hideTabs = '';
            /*显示下边的 tab菜单*/
        });

        $scope.$on('$ionicView.afterEnter', function () {

            console.log('afterEnter');

        }, false);


        $scope.$on('newsSevicesUpdata', function (event, data) {

            $scope.lists = newsServices.getData();
            /*数据*/
            /*广播要放在数据绑定以后*/
            $scope.$broadcast('scroll.infiniteScrollComplete');

        })


        $scope.loadMore = function () {
            newsServices.requesData();
            /*异步请求   所以$broadcast需要写到数据绑定以后*/
        };

        //判断是否有数据
        $scope.hasListData = function () {
            return newsServices.hasListData();
        };
        /*搜素页*/
        $scope.goSearch = function () {
            $state.go('news_search');
        };


        /*tab菜单点击切换*/

        $('.button-bar a').click(function(){
            $(".button-bar a").removeClass("active");
            $(this).addClass("active");
            //$(this).parent(".button-bar").animate({transform:"translateX(-20%)"},"slow");
        })

    })

    .controller('newsContentController', function ($scope, $rootScope, $state, $stateParams, NewsContentService, $sce) {
        $rootScope.hideTabs = 'tabs-item-hide';
        /*隐藏下边的 tab菜单*/

        var aid = $stateParams.aid;
        console.log(aid)
        $scope.isLoading = true;
        NewsContentService.getOne(aid);

        $scope.$on('NewsContentServiceUpdate', function (event, data) {   /*接收广播*/

            $scope.item = data;

            console.log(data);

            $scope.item.content = $sce.trustAsHtml($scope.item.content);

            $scope.isLoading = false;
        });
        $scope.goBack = function () {
            $state.go('tab.news');
        };
        //
        //

    })

    .controller('livesController', function ($scope, $rootScope, $state) {


    })
    .controller('chatsController', function ($scope, $rootScope, $state) {

    })

    .controller('meController', function ($scope, $rootScope, $state) {

    });
