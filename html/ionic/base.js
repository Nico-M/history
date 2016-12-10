var app = angular.module('nico', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.index', {
            url: '/index',
            views: {
                'tab-index': {
                    templateUrl: 'templates/content.html',
                    controller: 'indexCtrl'
                }

            }
        }).state('tab.neihan', {
            url: '/neihan',
            views: {
                'tab-neihan': {
                    templateUrl: 'templates/neihan.html',
                    controller: 'neihanCtrl'
                }

            }

        }).state('detail', {
            url: '/detail/:id',
            params: { 'id': null },
            templateUrl: 'templates/detail.html',
            controller: 'detailCtrl'
        }).state('tab.crazy', {
            url: '/crazy',
            views: {
                'tab-crazy': {
                    templateUrl: 'templates/crazy.html',
                    controller: 'crazyCtrl'
                }

            }
        }).state('tab.sister', {
            url: '/sister',
            views: {
                'tab-sister': {
                    templateUrl: 'templates/sister.html',
                    controller: 'sisterCtrl'
                }

            }
        })
    $urlRouterProvider.otherwise("/tab/index");
});
app.controller('indexCtrl', ['$scope', '$http', function($scope, $http) {

        var page = 0;
        // var count = 10;
        // function listResultProcess(data){
        //   return data
        // }
        var url = 'info.php';
        $scope.details = [];
        $scope.loadMore = function() {
            page++;
            // $http({
            //     method: 'GET'
            //     , url: url, //这里callback有点问题
            //     params: {
            //         page: page
            //     }
            // }).success(function (data) {
            //     console.log('加载数据')
            //     $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
            //     console.log(data);
            //     //发送事件
            //     $scope.$broadcast('scroll.infiniteScrollComplete');
            // }).error(function (state) {
            //     console.log('获取失败')
            // });
            // $scope.loadMore();
            url = 'https://route.showapi.com/341-3?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&page=' + page;
            $http.get(url).success(function(data) {
                $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
                console.log(data);
                //发送事件
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
        //事件接收
        $scope.$on('stateChangeSuccess', function() {
            console.log('触发事件');
            $scope.loadMore();
        });
        //初始调用
        $scope.loadMore()
    }])
    //内涵控制器
app.controller('neihanCtrl', function($scope, $http, $ionicLoading) {
    $ionicLoading.show({
        template: '客观,稍等',
    });
    var page = 0;
    //加载页面
    $scope.load = function() {
        page++;
        var url = 'https://route.showapi.com/978-2?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&page=' + page + '&'
        $http.get(url).success(function(data) {
            $ionicLoading.hide();
            $scope.datas = data.showapi_res_body.pagebean.contentlist;
            console.log($scope.datas);
            //实现分页功能
            // 页数
            //console.log($scope.datas.length)
            $scope.pageSize = 8;
            $scope.curPage = 0;
            $scope.pageCount = Math.ceil($scope.datas.length / $scope.pageSize) - 1;
            $scope.nextPage = function() {
                $scope.curPage < $scope.pageCount ? $scope.curPage++ : $scope.curPage;
            }
            $scope.prePage = function() {
                $scope.curPage > 0 ? $scope.curPage-- : $scope.curPage;
            }
        })
    };
    $scope.load();

});
//分页过滤器
app.filter('pageStartFrom', [function() {
    return function(input, start) {
        // console.log(input)
        if(input){
            start = +start;
        return input.slice(start);
        }
        
    }
}]);
//内涵详情页面
app.controller('detailCtrl', function($scope, $state, $http,$ionicHistory) {
    var id = ($state.params.id);
    console.log(id)
    var url = 'https://route.showapi.com/978-1?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&id=/xe/' + id + '.shtml&';
    $http.get(url).success(function(data) {
        $scope.img = (data);
    });
    $scope.back=function(){
        $ionicHistory.goBack();
    }
});
//蛇精病控制器
app.controller('crazyCtrl', function($scope, $http) {
        $scope.details = [];
        var page = 0;
        $scope.loadMore = function() {
            page++;
            var url = 'https://route.showapi.com/341-2?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&page=' + page + '&maxResult=20&';
            $http.get(url).success(function(data) {
                console.log(data);
                $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
                console.log(data);
                //发送事件
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).error(function(state) {
                console.log('获取失败')
            });
            // $scope.loadMore();
        };
        //事件接收
        $scope.$on('stateChangeSuccess', function() {
            console.log('触发事件');
            $scope.loadMore();
        });
        //初始调用
        $scope.loadMore()
    })
    //不得姐控制器

app.controller('sisterCtrl', function($scope, $http, $ionicLoading) {
    $ionicLoading.show({
        template: '客观,稍等',
    })
    var url = 'https://route.showapi.com/255-1?showapi_appid=28369&showapi_sign=27d6d8354bda4e648ffe14a93551b851&type=&title=&page=&';
    $http.get(url).success(function(data) {
        $ionicLoading.hide();
        $scope.dataArr = (data.showapi_res_body.pagebean.contentlist);
        console.log($scope.dataArr)
    })
})
app.filter('formate', function() {
    return function(str) {
        if(str){
             var newstr = (str.split('').slice(5).join(''))
        return newstr;
        }
       
    }
});
app.filter('getNumber', function() {
    return function(str) {
        return str.match(/(\d+)/g)[0]
    }
});
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])
