/**
 * Created by Administrator on 2016/8/23 0023.
 */
angular.module("myApp.services", [])

.service('newsSevices',function($http,$rootScope){


        var items='';
        var page=1;

        var hasData=true;

        return {
            requestData:function(){
                /*jsonp请求*/

                var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page="+page+"&callback=JSON_CALLBACK";
                $http.jsonp(myUrl).success(
                    function(data){

                      if(data.result==''|| data.result.length<20){    /*判断数据是否请求完成*/
                          hasData=false;
                      }
                        if(items!=''){
                            items=items.concat(data.result);   /*链接两个数组*/
                        }else{
                            items = data.result;

                        }
                        //广播告诉 controller数据请求完成  你可以拿数据了
                        $rootScope.$broadcast('newsSevicesUpdata',items);

                        page++;
                    }
                ).error(function(){
                        alert('shibai');

                 });




            },
            getData:function(){

              return  items;
            },
            hasListData:function(){   /*判断是否有疏忽*/

                return  hasData;
            }
        }

})


.service('newsContentSevices',function($http,$rootScope){


    var item='';

    return {
        requestData:function(aid){
            /*jsonp请求*/
            var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid="+aid+"&callback=JSON_CALLBACK"

            //var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=1&page=1&callback=JSON_CALLBACK";
            $http.jsonp(myUrl).success(
                function(data){
                    item = data.result;
                    //广播告诉 controller数据请求完成  你可以拿数据了
                    $rootScope.$broadcast('newsContentSevicesUpdata',item);
                }
            ).error(function(){
                    alert('shibai');

                });

        }
    }

})


    .service('Tab1Service', function ($http) {
        this.getClassify = function () {
            return [
                {
                    name: '头条',
                    isload: true,
                    page: 1,
                    rows: 20,
                    items: [],
                    loadMore: function () {
                        $this = this;
                        var url= 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+$this.page+'&callback=JSON_CALLBACK';
                        console.log("正在加载更多数据..." + this.page);
                        $http.jsonp(url).success(function (response) {
                            $this.items = $this.items.concat(response.result);

                            if(response.length<20){
                                $this.isload=false;
                            }
                            $this.page++;
                            $this.callback();
                        });
                    },
                    doRefresh: function () {
                        $this = this;
                        console.log("正在执行refresh操作...");
                        $http.jsonp(this.url).success(function (response) {
                            $this.page = 2;

                            $this.items = response.result;
                            $this.callback();
                        });
                    },
                    callback: function () {
                        //回掉函数
                    }
                },
                {
                    name: '精选',
                    isload: true,
                    page: 1,
                    rows: 20,
                    items: [],
                    loadMore: function () {
                        $this = this;
                        console.log("正在加载更多数据..." + this.page);
                        var url= 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=8&page='+this.page+'&callback=JSON_CALLBACK';

                        $http.jsonp(url).success(function (response) {
                            $this.items = $this.items.concat(response.result);
                            $this.page++;
                            if(response.length<20){
                                $this.isload=false;
                            }
                            $this.callback();
                        });
                    },
                    doRefresh: function () {
                        $this = this;
                        console.log("正在执行refresh操作...");
                        $http.jsonp(this.url).success(function (response) {
                            $this.page = 2;
                            $this.items = response.result
                            $this.callback();
                        });
                    },
                    callback: function () {
                        //回掉函数
                    }
                },
                {
                    name: '娱乐', isload: true,

                    page: 1, rows: 20,
                    items: [],
                    loadMore: function () {
                        $this = this;
                        var url= 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+this.page+'&callback=JSON_CALLBACK';
                        console.log("正在加载更多数据..." + this.page);
                        $http.jsonp(url).success(function (response) {
                            $this.items = $this.items.concat(response.result);
                            $this.page++;
                            $this.callback();
                        });
                    },
                    doRefresh: function () {
                        $this = this;
                        console.log("正在执行refresh操作...");
                        $http.jsonp(this.url).success(function (response) {
                            $this.page = 2;
                            if(response.length<20){
                                $this.isload=false;
                            }
                            $this.items = response.result
                            $this.callback();
                        });
                    },
                    callback: function () {
                        //回掉函数
                    }
                },

                {
                    name: '体育',
                    isload: true,

                    page: 1, rows: 20,
                    items: [],
                    loadMore: function () {
                        $this = this;
                        var url= 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+this.page+'&callback=JSON_CALLBACK';
                        console.log("正在加载更多数据..." + this.page);
                        $http.jsonp(url).success(function (response) {
                            $this.items = $this.items.concat(response.result);
                            $this.page++;
                            $this.callback();
                        });
                    },
                    doRefresh: function () {
                        $this = this;
                        console.log("正在执行refresh操作...");
                        $http.jsonp(this.url).success(function (response) {
                            $this.page = 2;
                            if(response.length<20){
                                $this.isload=false;
                            }
                            $this.items = response.result
                            $this.callback();
                        });
                    },
                    callback: function () {
                        //回掉函数
                    }
                },

                {
                    name: '网易号',
                    isload: true,

                    page: 1, rows: 20,
                    items: [],
                    loadMore: function () {
                        $this = this;
                        var url= 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+this.page+'&callback=JSON_CALLBACK';
                        console.log("正在加载更多数据..." + this.page);
                        $http.jsonp(url).success(function (response) {
                            $this.items = $this.items.concat(response.result);
                            $this.page++;
                            $this.callback();
                        });
                    },
                    doRefresh: function () {
                        $this = this;
                        console.log("正在执行refresh操作...");
                        $http.jsonp(this.url).success(function (response) {
                            $this.page = 2;
                            if(response.length<20){
                                $this.isload=false;
                            }
                            $this.items = response.result
                            $this.callback();
                        });
                    },
                    callback: function () {
                        //回掉函数
                    }
                }
            ]
        }
    })