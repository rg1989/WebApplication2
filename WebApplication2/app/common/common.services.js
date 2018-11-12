(function () {
    "use strict";

    //storing the link to the API
    angular.module("common.services", []).
        constant("appSettings", {
            serverPath: "https://api.github.com/search/repositories?q="
        });

}());