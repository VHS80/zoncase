
var app = angular.module('myApp', ['ui.filters']);
app.controller('myCtrl', function($scope,$http) {
  
  //$scope.ratingJson = [{rating:"AAAAA"},{rating:"AAAA"},{rating:"AAA"},{rating:"AE"},{rating:"A"},{rating:"AAAA"},{rating:"A"}]; 
  //$scope.amountJson = [{amount:"200"},{amount:"300"},{amount:"90"},{amount:"300"},{amount:"200"}]; 
  
  $scope.updateAvgSum = function() {
    $scope.amountJson = $scope.getRequest("fields=amount&rating__in=[\""+$scope.ratingField.rating+"\"]");
    $scope.calcAverage();
  }
  
  $scope.calcAverage = function(){ 
    var sum = 0; 
    for(a in $scope.amountJson){
      sum += parseInt($scope.amountJson[a].amount); 
    }

    $scope.avgSum = sum/$scope.amountJson.length;

};
  
  $scope.getRequest = function(params) {
    $http({
        method:'GET',
        url: "https://crossorigin.me/https://api.zonky.cz/loans/marketplace?"+params,
        header: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
    }).then(
      function successCallback(response) {
        return response;
      },
      function errorCallback(response) {
        console.log("Data failed");
      }
    );
  };
  
  var init = function() {
    	$scope.ratingJson = $scope.getRequest("fields=rating"); 
      };
								
  init();
  
});         
