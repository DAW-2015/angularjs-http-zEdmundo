var app = angular.module("myApp", []);

app.factory("starWarsService", ["$http", function ($http) {
  var starWarsService = (function () {
    return {
      people: [],
      getPeopleList: function (callback, page) {
        var args = arguments;

        if (args[1] == undefined)
          page = 1;

        var self = this;
        $http.get("http://swapi.co/api/people/?page=" + page).success(function (response) {
          for (var people in response.results)
            self.people.push(response.results[people]);

          if (response.next != null)
            self.getPeopleList(callback, page+1);
          else
            callback(self.people);
        });
      }
    };
  })();

  return starWarsService;
}]);

app.controller("starWarsController", ["$scope", "starWarsService", function ($scope, starWarsService) {
  this.service = starWarsService;

  this.showDetails = function (object) {
    var _msg = "";

    _msg += "Nome: " + object.name + "\n";
    _msg += "Altura: " + object.height + "\n";
    _msg += "Peso: " + object.mass + "\n";
    _msg += "Sexo: " + object.gender + "\n";
    _msg += "Ano de Nascimento: " + object.birth_year + "\n";

    alert(_msg);
  };

  starWarsService.getPeopleList(function (response) {
    console.log("All loaded");
    console.log(response);
  });
}]);
