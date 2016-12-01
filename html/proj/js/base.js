//这里忘记加ui.router
var app=angular.module('nico',['ui.router']);
//定义路由UI-ROUTER
app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('index',{
        url:'/index',
        templateUrl:'templates/index.html'
    })
    //注意子路由书写模式,新闻频道框架
    .state('index.news',{
        url:'/news/:id',
        templateUrl:'templates/list.html',
        controller:'newsCtrl'
    })
    //详细页面路由框架
    .state('index.detail',{
        url:'/detail/:id',
        templateUrl:'templates/detail.html',
        controller:'detailCtrl'
    })
    //默认跳转到新闻界面
    $urlRouterProvider.when('','/index/news/');
})
app.controller('indexCtrl',function($scope,$state){
    //$scope.id = $state.params.id;
})
//新闻频道界面根据网址id加载相应频道的简介
app.controller('newsCtrl',function($scope,$http,$state,$rootScope,Data){

    $rootScope.id = $state.params.id;
   
    if(!$rootScope.id){
        $rootScope.id = 0;
    }
    // console.log(id);
    $scope.news = [];
    var page = 0
   //定义加载函数
    $scope.loadChannel=function(id){
        console.log(page)
        page++;
         $scope.listMore=true;
        var arr = [{"channelId": "5572a109b3cdc86cf39001db",
                "name": "国内最新"},{ "channelId": "5572a109b3cdc86cf39001de",
                "name": "国际最新"},{"channelId": "5572a109b3cdc86cf39001da",
                "name": "社会焦点"},{ "channelId": "5572a108b3cdc86cf39001d6",
                "name": "游戏焦点"},{ "channelId": "5572a108b3cdc86cf39001d9",
                "name": "科技焦点"}]
        $http.get('news.php',{
        params:{
            channelId:arr[id].channelId ,
            page:page,
            channelName:arr[id].name
        }
    }).success(function(data){
         $scope.listMore=false;
        console.log(data)
        $scope.news =$scope.news.concat(data.showapi_res_body.pagebean.contentlist)
        Data.arr = $scope.news

    })
    }
     $scope.loadChannel($rootScope.id)
    
})
//定义一个服务用于传输数据,
//此传输引起的一个问题是,页面刷新后会无数据
app.service('Data',function(){
    this.arr = null;
})
//将搜索框写成一个组件加载
app.directive('xsearch',function(){
    return {
        templateUrl:'templates/search.html',

    }
})
// 详细页面的内容
app.controller('detailCtrl',function($scope,$state,Data,$sce){
    var num = $state.params.id;
    $scope.detaileNews = Data.arr[num]
    console.log($scope.detaileNews);
    // $scope.html =$sce.trustAsHtml($scope.detaileNews.html) 

})
// app.service('load',function($http,$rootScope){
//     function loadChannel(id,page){
        
        
//         $http.get('news.php',{
//         params:{
//            channelId:arr[id].channelId ,
//            page:page,
//            channelName:arr[id].name
//         }
//     }).success(function(data){
//         console.log(data)
//         $rootScope.news = data.showapi_res_body.pagebean.contentlist
//     })
//     };
// })