var app = angular.module("scoreboard", []);

app.controller("scoreboardController", ['$scope', function($scope) {

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
        $scope.submitted = true;
        result.id = $scope.results.length + 1;
        $scope.comparePlayersScore(result)

        $scope.results.push(result);
        $scope.result = {};        
    }

    $scope.comparePlayersScore = function (result) {       
        console.log("checkPlayersScore");

        if (result.score_1 < 0 || result.score_2 < 0){
            console.log("wrong input");
        }
        else {
            if (result.score_1 == 11 && result.score_2 < 10) { 
                console.log(result.player_1 + " wins");
            }
            if (result.score_2 == 11 && result.score_1 < 10) { 
                console.log(result.player_2 + " wins");
            }
            if (result.score_1 < 11 && result.score_2 < 11) { 
                console.log("in progressing"); 
            } 
            if (result.score_1 > 10 && result.score_2 > 10) {
                if ((result.score_1 - result.score_2) > 2 || (result.score_2 - result.score_1) > 2) {
                    console.log("wrong input");
                }
                if ((result.score_1 - result.score_2) == 2) { 
                    console.log(result.player_1 + " wins");
                }
                if ((result.score_2 - result.score_1) == 2) { 
                    console.log(result.player_2 + " wins");
                }
                if ((result.score_1 - result.score_2) <= 1 || (result.score_2 - result.score_1) <= 1) {
                    console.log("in progressing");
                } 
            }
        }
    };
    $scope.addPlayer = function() {
        if (angular.isDefined($scope.name) && $scope.name != '') {
            // ADD A NEW ELEMENT.
            $scope.players.push({ id: $scope.players.length + 1,  name: $scope.name });
            // CLEAR THE FIELDS.
            $scope.name = '';
        }

    }
}]);