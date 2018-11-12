(function () {
    "use strict";

    angular.module("common.services")
        .service("resourceRepo", ["appSettings", "$q", "$http", productRepo])

    function productRepo(appSettings, $q, $http) {

        //get request with the required param to return the list promise
        this.getList = function (search_param) {
            var param = angular.isDefined(search_param) && search_param != '' ? search_param : "all";
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: appSettings.serverPath + param,
            }).then(function success(response) {
                deferred.resolve(response);
            }, function failure(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        //post request with the data sent to the server, to save favourite
        this.setFavourite = function (fav_git_item) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: "Home/SaveFavourite",
                data: $.param({ id: fav_git_item.id ,name: fav_git_item.name, imageUrl: fav_git_item.owner.avatar_url }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).then(function success(response) {
                deferred.resolve(response);
            }, function failure(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

}());