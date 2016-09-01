/**
 * Created by Administrator on 2016/8/27 0027.
 */

var app = angular.module('myApp', ['ionic', 'myApp.controller','starter.directive','myApp.services']);
app.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    /*不同平台的默认样式配置*/

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.backButton.previousTitleText(false);

    /*配置路由*/
    $stateProvider.state('tab', {
            url: '/tab',
            templateUrl: 'templates/tabs.html',
            abstract: true
        })
        //新闻
        .state('tab.news', {
            url: '/news',
            views: {
                /*定义视图展示的页面*/
                'tab-news': {
                    templateUrl: 'templates/news.html',
                    controller: 'newsController'
                }
            }
        })
        .state('tab.news_search', {
            url: '/news_search',
            views: {
                /*定义视图展示的页面*/
                'tab-news': {
                    templateUrl: 'templates/news/news_search.html',
                    controller: 'newsSearchController'
                }
            }
        })

        .state('tab.news_lives', {
            url: '/news_lives',
            views: {
                /*定义视图展示的页面*/
                'tab-news': {
                    templateUrl: 'templates/news/news_lives.html',
                    controller: 'newsLivesController'
                }
            }
        })
        .state('tab.news_content', {
            url: '/news_content/:aid',
            views: {
                /*定义视图展示的页面*/
                'tab-news': {
                    templateUrl: 'templates/news/news_content.html',
                    controller: 'newsContentController'
                }
            }
        })


        .state('tab.lives', {
            url: '/lives',
            views: {
                /*定义视图展示的页面*/
                'tab-lives': {
                    templateUrl: 'templates/lives.html',
                    controller: 'livesController'
                }
            }
        })
        .state('tab.video', {
            url: '/video',
            views: {
                /*定义视图展示的页面*/
                'tab-lives': {
                    templateUrl: 'templates/liveVideo/video.html',
                    controller: 'videoController'
                }
            }
        })

        .state('tab.videoPlay', {
            url: '/videoPlay',
            views: {
                /*定义视图展示的页面*/
                'tab-lives': {
                    templateUrl: 'templates/liveVideo/videoPlay.html',
                    controller: 'videoPlayController'
                }
            }
        })
        .state('tab.chats', {
            url: '/chats',
            views: {
                /*定义视图展示的页面*/
                'tab-chats': {
                    templateUrl: 'templates/chats.html',
                    controller: 'chatsController'
                }
            }
        })

        .state('tab.me', {
            url: '/me',
            views: {
                /*定义视图展示的页面*/
                'tab-me': {
                    templateUrl: 'templates/me.html',
                    controller: 'meController'
                }
            }
        });
    /*找不到路由跳转的默认*/
    $urlRouterProvider.otherwise('/tab/news')


});