var app = angular.module('TabsExample', ['ui.bootstrap']);

app.controller("TabsWrapperCtrl", function ($scope, newsRepository){

  $scope.entertainmentNews = [];
  $scope.techNews = [];

  $scope.loadingTab2 = true;
  $scope.loadingTab3 = true;
  
  $scope.loadSportNews = function(forceRefresh){
    if(forceRefresh){
      newsRepository.getAllSportNews().then(
        function(result){
          if(result.data){
            var sports = result.data;

            angular.element(document.getElementById('divSportsNewsContainter')).html(''); 

            sports.forEach(function(element){
                angular.element(document.getElementById('divSportsNewsContainter')).append(
                "<div class='heading row'><a class='col-xs-12' href='" + element.link +  "'>" + element.title + "</a></div>");
            });
          }
        },
        function(error){
          console.log(error);
        }
      );
    }
  };
  
  $scope.loadEntertainmentNews = function(forceRefresh){
    if($scope.entertainmentNews == null || $scope.entertainmentNews.length == 0  || forceRefresh){
      newsRepository.getAllEntertainmentNews().then(
        function(result){
          if(result.data){
            $scope.entertainmentNews = result.data;
          }
        },
        function(error){
          $scope.entertainmentNews = [];
          console.log(error);
        }
      )
      .finally(function(){
        $scope.loadingTab2 = false;
      });
    }
  };
  
  $scope.loadTechNews = function(forceRefresh){
    if($scope.techNews == null || $scope.techNews.length == 0 || forceRefresh){
      var data = newsRepository.getAllTechNews().then(
        function(result){
          if(result.data){
            $scope.techNews = result.data;
          }
        },
        function(error){
          $scope.techNews = [];
          console.log(error);
        }
      )
      .finally(function(){
        $scope.loadingTab3 = false;
      });
    }
  };
  
});

app.factory('newsRepository', function($http, $q, configService){
  return { 
    getAllSportNews: function(){
      return $http.get(configService.API_SPORTS_ENDPOINT).then(
        function(response){
          return response.data;
        },
        function(error){
          return $q.reject(error.data)
        }
      );
    },
    
    getAllTechNews: function(){
      return $http.get(configService.API_TECH_ENDPOINT).then(
        function(response){
          return response.data;
        },
        function(error){
          return $q.reject(error.data)
        }
      );
    },
    
    getAllEntertainmentNews: function(){
      return $http.get(configService.API_ENTERTAINMENT_ENDPOINT).then(
        function(response){
          return response.data;
        },
        function(error){
          return $q.reject(error.data)
        }
      );
    }
    
  };
});

app.value('configService', {
  'API_SPORTS_ENDPOINT': '/newsapi/sportnews',
  'API_TECH_ENDPOINT': '/newsapi/technews',
  'API_ENTERTAINMENT_ENDPOINT': '/newsapi/entertainmentnews'
});