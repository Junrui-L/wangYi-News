/**
 * Created by Administrator on 2016/8/27 0027.
 */
angular.module('myApp.services', [])
    .service('newsServices', function ($http,$state, $rootScope) {
        var lists = '';
        var page = 1;
        var hasData = true;
        return {
            requesData: function () {
                /*jsonP请求*/

                var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=" + page + "&callback=JSON_CALLBACK";
                console.log(myUrl);
                $http.jsonp(myUrl).success(
                    function (data) {

                        if (data.result == '' || data.result.length < 20) {    /*判断数据是否请求完成*/
                            hasData = false;
                        }
                        if (lists != '') {
                            lists = lists.concat(data.result);
                            /*链接两个数组*/
                        } else {
                            lists = data.result;

                        }
                        //广播告诉 controller数据请求完成  你可以拿数据了
                        $rootScope.$broadcast('newsSevicesUpdata', lists);

                        page++;
                    }
                ).error(function () {
                    alert('shibai');

                });
            },

            getData: function () {
                return lists;
            },
            hasListData: function () { /*判断是否还有数据*/
                return hasData;
            }
        }

    })
    .service('NewsContentService', function ($http, $rootScope) {
        return {
            getOne: function (aid) {
                var item = '';

                var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=" + aid + "&callback=JSON_CALLBACK";
                console.log(myUrl)
                $http.jsonp(myUrl).success(
                    function (data) {
                        item = data.result[0];
                        $rootScope.$broadcast('NewsContentServiceUpdate', item);
                    }
                ).error(function () {
                    alert('shibai');

                });

            }

        }


    })

    //保存url地址
    .factory('pageCache',function($cacheFactory){
        return $cacheFactory('page');
    })

    .factory('commonFactory',function(pageCache,$location){
        return{
            backUrl:function(url){
                pageCache.put('url',url);//这个用来保存页面
            },

            goBack:function(){
                $location.path(pageCache.get('url'));//这个用来跳转页面
            }
        }
    })