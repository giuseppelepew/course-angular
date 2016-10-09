( function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService){
  var ToBuy = this;
  ToBuy.items = ShoppingListCheckOffService.getToBuyItems();
  ToBuy.MoveToBoughtItem = function (itemIndex) {
    ShoppingListCheckOffService.MoveToBoughtItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService){
  var AlreadyBought = this;
  AlreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
    var service = this;

    var ToBuyList = [
      {
        name: "Tzatziki",
        quantity: "2"
      },
      {
        name: "Mousaka",
        quantity: "10"
      },
      {
        name: "Gyro",
        quantity: "4"
      },
      {
        name: "Feta",
        quantity: "12"
      },
      {
        name: "Ouzo",
        quantity: "1"
      }
    ];

    var BoughtList = [];

    service.getToBuyItems = function () {
      return ToBuyList;
    };

    service.getBoughtItems = function () {
      return BoughtList;
    };

    service.MoveToBoughtItem = function(itemIndex){
      BoughtList.push(ToBuyList[itemIndex]);
      ToBuyList.splice(itemIndex, 1);
    }

}


}) ();
