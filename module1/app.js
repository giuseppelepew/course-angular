( function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LSController);

LSController.$inject = ['$scope'];

function LSController($scope){
  $scope.displayStatus = function() {
    var items = calculateItems($scope.lunch)
    if (items > 3) {
      $scope.name = "Too much!";
    } else if (items > 0) {
      $scope.name = "Enjoy!";
    } else {
      $scope.name = "Please enter data first";
    }
  }

  function calculateItems(string) {
    var lunchList = string.split(',');
    var nonEmptyItems = 0;
    for (var i = 0; i < lunchList.length; i++) {
      if (lunchList[i].trim()) {
        nonEmptyItems++;
      }
    }
    return nonEmptyItems;
  }
}


})();
