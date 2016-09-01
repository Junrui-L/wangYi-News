/**
 * Created by Administrator on 2016/8/27 0027.
 */
angular.module('myApp.controller', ['myApp.services'])
    .controller('newsController', function ($scope, $rootScope, $state,$ionicPopup, $ionicSlideBoxDelegate,$timeout,newsServices,$location,commonFactory) {

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
            commonFactory.backUrl($location.url());
            /*记录url地址*/
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
        /*点击×弹窗*/
        $scope.showAlert = function() {

            var alertPopup = $ionicPopup.alert({
                title: '选择不感兴趣的关键词',
                template: 'It might taste good'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });

            $state.go('tab.news_search');
        };

        /*下拉加载更多*/
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
            $state.go('tab.news_search');
        };
        /*直播页面*/
        $scope.goLives = function () {
            $state.go('tab.news_lives');
        };
        /*tags页面*/
        $scope.goTags = function () {
            if($rootScope.hideTabs){
                $rootScope.hideTabs ="";
                $('.tags-container').slideUp(300);
                $('.news-container').show();
                $('.button-bar').show();
                $('.changes').hide();
                $('.drop-tag').css("transform", "rotate(0deg)");
            } else{
                $rootScope.hideTabs = 'tabs-item-hide';
                $('.news-container').hide();
                $('.tags-container').slideDown(200);
                $('.button-bar').hide();
                $('.changes').show();
                $('.drop-tag').css("transform", "rotate(180deg)");
            }

        };
        /*tab菜单点击切换*/

        $('.button-bar a').click(function(){
            $(".button-bar a").removeClass("active");
            $(this).addClass("active");
            //$(this).parent(".button-bar").animate({transform:"translateX(-20%)"},"slow");
        })


        //这个是跳转用的
        //
        //$scope.$on('$ionicView.beforeEnter',function(){
        //
        //    commonFactory.backUrl($location.url());//保存当前页面的url
        //
        //})
    })

    .controller('newsSearchController', function ($scope, $rootScope, $state,commonFactory) {
        /*隐藏下边的tab菜单*/

        /*返回上一级菜单*/
        $scope.goBack=function(){
            commonFactory.goBack();
        };

    })

    .controller('newsLivesController', function ($scope, $rootScope, $state,commonFactory) {
        /*隐藏下边的tab菜单*/
        /*返回上一级菜单*/
        $scope.goBack = function () {
            commonFactory.goBack();
        };

    })
    .controller('newsContentController', function ($scope, $rootScope, $state, $stateParams,$ionicPopover, NewsContentService, $sce) {
        /*隐藏下边的 tab菜单*/
        /*返回上一级菜单*/
        var aid = $stateParams.aid;
        //console.log(aid)
        $scope.isLoading = true;
        NewsContentService.getOne(aid);

        $scope.$on('NewsContentServiceUpdate', function (event, data) {   /*接收广播*/

            $scope.item = data;

            //console.log(data);

            $scope.item.content = $sce.trustAsHtml($scope.item.content);

            $scope.isLoading = false;
        });
        $scope.goBack = function () {
            $state.go('tab.news');
        };
        /*点击弹出的设置层*/
        $ionicPopover.fromTemplateUrl('templates/news/news_popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        // 清除浮动框
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover.hidden', function() {
            // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on('popover.removed', function() {
            // 执行代码
        });


    })

    .controller('livesController', function ($scope, $rootScope, $state) {

        //显示tab菜单
        $scope.$on('$ionicView.beforeEnter', function () {
            $rootScope.hideTabs = '';
            /*显示下边的 tab菜单*/
        });

        $scope.$on('$ionicView.afterEnter', function () {

            console.log('afterEnter');

        }, false);


    })

    .controller('videoController', function ($scope, $rootScope, $state) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $rootScope.hideTabs = '';
            /*显示下边的 tab菜单*/
        });

        $scope.$on('$ionicView.afterEnter', function () {

            console.log('afterEnter');

        }, false);

        $scope.videoPlay = function () {
            $state.go('tab.videoPlay');
        };


    })

    .controller('videoPlayController', function ($scope, $rootScope, $state) {
        $rootScope.hideTabs = 'tabs-item-hide';

        $scope.goBack = function () {
            $state.go('tab.video');
        };

    })

    .controller('chatsController', function ($scope, $rootScope, $state) {
        $scope.$on('$ionicView.beforeEnter', function () {


            /*加载就可以tab切换*/
            $scope.changeTab = function() {
                $(".chats_content").hide(); //Hide all content
                $(".chats_content:first").show(); //Show first tab content

                //On Click Event
                $("ul.chats-tab li a").click(function() {
                    $("ul.chats-tab li a").removeClass("active"); //Remove any "active" class
                    $(this).addClass("active");
                    $(".chats_content").hide(); //Hide all tab content
                    var activeTab = $(this).attr("href"); //Find the rel attribute value to identify the active tab + content
                    $(activeTab).fadeIn(); //Fade in the active content
                    return false;
                });

            }



        });

        $scope.$on('$ionicView.afterEnter', function () {

            console.log('afterEnter');

        }, false);



        /*tab选项卡的切换*/


    })

    .controller('meController', function ($scope, $rootScope, $ionicModal, $state) {


        //登录页面
        $ionicModal.fromTemplateUrl('templates/me/login.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function (modal) {
            $scope.login = modal;
        });

        $scope.openLogin = function () {
            $scope.login.show();
        };
        $scope.closeLogin = function () {
            $scope.login.hide();
        };


        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // 当隐藏的模型时执行动作
        $scope.$on('modalc.hide', function () {

        });
        // 当移动模型时执行动作
        $scope.$on('modalc.removed', function () {
            // 执行动作
        });

        /*设置页面*/
        $ionicModal.fromTemplateUrl('templates/me/setting.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function (modal) {
            $scope.setting = modal;
        });

        $scope.openSetting = function () {
            $scope.setting.show();
        };
        $scope.closeSetting = function () {
            $scope.setting.hide();
        };

    });
