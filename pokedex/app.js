var app = angular.module('pokedex', []);

app.factory('PokedexService', function($http){
  var pokedexService = {};

  pokedexService.getPokemons = function(callback) {
    $http.get('http://pokeapi.co/api/v1/pokedex/1/').then(function(response) {
      var answer = response.data.pokemon;
      callback(answer);
    }, function(response) {
      var answer = null;
      callback(answer);
    });
  };

  pokedexService.getPokemonDescriptionById = function(id, callback) {
    // TODO: implementar código para recuperar os detalhes de um pokemon por seu id
    $http.get("http://pokeapi.co/api/v1/pokemon/" + id + "/").then(function (response) {
        var answer = response.data.abilities;
        callback(answer);
    });
  };

  return pokedexService;
});

app.controller('PokedexController', ['PokedexService', function(pokedexService){
  var self = this;
  self.pokemons = [];

  pokedexService.getPokemons(function(answer) {
    if (answer !== null) {
      self.pokemons = answer;

      for (var key in self.pokemons)
        self.pokemons[key].id = parseInt(self.pokemons[key].resource_uri.split("/pokemon/")[1].split("/")[0]);
    }
  });

  this.getDetails = function (id) {
    id = this.search;

    pokedexService.getPokemonDescriptionById(id, function (answer) {
      for (var key in self.pokemons)
        if (self.pokemons[key].id == id)
          angular.extend(self.pokemons[key], answer);
    });
  };
}]);
