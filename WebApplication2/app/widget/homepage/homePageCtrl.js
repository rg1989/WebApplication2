(function () {
    "use strict";
    angular
        .module("gitRepoApp")
        .controller("homePageCtrl", ["resourceRepo", homePageCtrl]);

    function homePageCtrl(resourceRepo) {

        var vm = this;

        //gets init default data when set with no param
        function getData(search_param) {
            resourceRepo.getList(search_param).then(function success(response) {
                if (angular.isDefined(response.data.items)) {
                    vm.itemsList = response.data.items;
                }
            }, function failure(response) {
                var t = response;
            })
        };
        //init call for homepage
        getData();

        //search by value in textbox
        vm.searchByVal = function () {
            getData(vm.serchText);
        }

        //clear textbox and reset default data
        vm.clrSearch = function () {
            getData();
            vm.serchText = "";
        }

        //click on set favourite item link
        vm.setFavItem = function (fav_item) {
            resourceRepo.setFavourite(fav_item).then(function success(response) {
                //simple implimintation of error handling (cannot favourite link twice)
                if (response.data == "error") {
                    alert("You've already added this one to favorites");
                }
            }, function failure(response) {
                var t = response;
            })
        }
    }
}());