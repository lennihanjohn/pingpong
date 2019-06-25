var app = angular.module("scoreboard", []);

app.controller("scoreboardController", ['$scope', 'PlayerService', 'LeagueService', function ($scope, PlayerService, LeagueService) {

    $scope.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" }
    ];

    $scope.results = [
        { id: 1, player_1: "Justin", score_1: 11, player_2: "Steve (CEO)", score_2: 6},
        { id: 2, player_1: "Steve (CEO)", score_1: 13, player_2: "Dan", score_2: 11},
        { id: 3, player_1: "Liam", score_1: 6, player_2: "Lee", score_2: 11},
        { id: 4, player_1: "Liam", score_1: 11, player_2: "Steve (CEO)", score_2: 9},
        { id: 5, player_1: "Justin", score_1: 14, player_2: "Lee", score_2: 12},
        { id: 6, player_1: "Justin", score_1: 10, player_2: "Dan", score_2: 12},
        { id: 7, player_1: "Dan", score_1: 11, player_2: "Lee", score_2: 9},
        { id: 8, player_1: "Justin", score_1: 11, player_2: "Liam", score_2: 3},
        { id: 9, player_1: "Tracey", score_1: 11, player_2: "Emma", score_2: 8},
        { id: 10, player_1: "Emma", score_1: 11, player_2: "Dan", score_2: 9}
    ];

    $scope.league = [];

    $scope.addResult = function(result) {
        result.id = $scope.results.length + 1;
        addLeagueByParams(result);
        $scope.results.push(result);
        $scope.result = {};        
    }

    $scope.addPlayer = function() {
        // VALIDATE NAME VALUE
        if (angular.isDefined($scope.name) && $scope.name != '') {
            // ADD A NEW ELEMENT.
            $scope.players.push({ id: $scope.players.length + 1,  name: $scope.name });
            // CLEAR THE FIELDS.
            $scope.name = '';
        }
    }

    var addLeagueByParams = function (result) {
        // LeagueService
        LeagueService.addLeague($scope.league, result)
    }

    var addLeagues = function () {
        // LOAD AND CALCULATE EXSTING DATA FROM RESULT ARRAY
        for (var i = 0; i < $scope.results.length; i++) {
            addLeagueByParams($scope.results[i])
        }
    }
    // // INITIALIZE THE ARRAY
    addLeagues()
}]);


app.service('LeagueService', ['PlayerService', function (PlayerService) { 

    this.addLeague = function (league,result) {
        // GET WINNER NAME
        name = PlayerService.comparePlayersScore(result)
        let existing_player =league.find(e => e.name == name)
        // DETERMINE ADD NEW RECORD OR ADD SCORE TO EXSITING NAME
        if (existing_player != undefined) {
            existing_player.score += 2
        } else {
            league.push({ name: name, score: 2 });
        }
        return league.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    }
}]);



app.service('PlayerService', function () {
    // RETURN WINNER NAME
    this.comparePlayersScore = function (result) {
        console.log('PlayerService' + JSON.stringify(result))
        if (result.score_1 < 0 || result.score_2 < 0) {
            // console.log("wrong input");
        }
        else {
            if (result.score_1 == 11 && result.score_2 < 10) {
                // console.log(result.player_1 + " wins");
                return result.player_1;
            }
            if (result.score_2 == 11 && result.score_1 < 10) {
                // console.log(result.player_2 + " wins");
                return result.player_2;
            }
            if (result.score_1 < 11 && result.score_2 < 11) {
                // console.log("in progressing");
            }
            if (result.score_1 >= 10 && result.score_2 >= 10) {
                if ((result.score_1 - result.score_2) > 2 || (result.score_2 - result.score_1) > 2) {
                    // console.log("wrong input");
                }
                if ((result.score_1 - result.score_2) == 2) {
                    // console.log(result.player_1 + " wins");
                    return result.player_1;

                }
                if ((result.score_2 - result.score_1) == 2) {
                    // console.log(result.player_2 + " wins");
                    return result.player_2;

                }
                if ((result.score_1 - result.score_2) <= 1 || (result.score_2 - result.score_1) <= 1) {
                    // console.log("in progressing");
                }
            }
        }
    };
});