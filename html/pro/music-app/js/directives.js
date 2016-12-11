angular.module('app.directives', [])

.directive('ionplay', [function(){
    return{
        templateUrl:'templates/ionplay.html',
        link:function(scope,ele,attr){
            scope.url="mp3/lover.mp3"
            var audio=ele[0].querySelector('audio');
            scope.switch=true;
           
            scope.play=function(){
                scope.switch=!scope.switch;
                audio.play();

            }
            scope.pause=function(){
                scope.switch=!scope.switch
                audio.pause();
            }
        }
    }
}]);