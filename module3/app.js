( function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective(){
  var ddo = {
    templateUrl: "foundItems.html",
    restrict:"A",
    scope : {
      foundItems : "<",
      onRemove: "&"
    }
  };
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
  var NarrowIt = this;
  //Removes items
  NarrowIt.removeItem = function(itemIndex){
     NarrowIt.found.splice(itemIndex, 1);
     if (NarrowIt.found.length == 0) {
       NarrowIt.check = 1;
     }
  }
  //Finds Matches -calls getMatchedMenuItems function
  NarrowIt.find = function() {
    if (NarrowIt.Keyword == undefined || NarrowIt.Keyword == ""){
       //Flags ng-if to show message
       NarrowIt.check = 1;
       //Clears previous data
       NarrowIt.found = [];
    } else {
       //Gets promise
       var promise = MenuSearchService.getMatchedMenuItems(NarrowIt.Keyword);
       //Unwraps promise
       promise.then(function(result){
            //Saves data on found
            NarrowIt.found = result;
            //Flags ng-if to show message if there are no results
            if (NarrowIt.found.length == 0) {
              NarrowIt.check = 1;
            } else {
              NarrowIt.check = 0;
            }
        }). catch(function(error){
            console.log("There is an error");
        });
    }
  }

}

MenuSearchService.$inject = ['$http'];

function MenuSearchService($http) {
    var service = this;
    //Gets remote data asynchrounosly
    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then(function(result){
        //Gets searchTerm atches
        var items = result.data.menu_items;
        var foundItems = [];
        for (var i in items){
              if (items[i].description.indexOf(searchTerm)!==-1) {
                foundItems.push(items[i]);
             }
          }
        return foundItems;
      });
    }
}




}) ();
