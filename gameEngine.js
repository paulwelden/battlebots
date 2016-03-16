'use strict';
var game = require('./gameState');
var actions = require('./actions');
var actionEval = require('./actionEval');
var projectileEval = require('./projectileEval');
var deepcopy = require('deepcopy');

module.exports = class gameEngine{

    static tick(game) {
        var actionsToDo = [];
        for (var botName in game.activeBots) {
            var bot = game.activeBots[botName];
            var action = new actions();
            var gameCopy = deepcopy(game);
            bot.ai(gameCopy, action);
            actionsToDo[bot.name] = action;
        }

        //do projectile moves
        for (var projectileKey in game.projectiles) {
            var projectile = game.projectiles[projectileKey];

            
            if(projectileEval.eval(projectile, game)) {
                //Remove projectile if we hit them
                var i = game.projectiles.indexOf(projectileKey);
                console.log(game.projectiles.length);
                if(i != -1){
                    game.projectiles.splice(i,1);
                }
                console.log(game.projectiles.length);
            }
        }

        for (var actionKey in actionsToDo) {
            var action = actionsToDo[actionKey];

            var bot = game.activeBots[actionKey];

            actionEval.eval(action, game.activeBots[actionKey], game);
        }
    }
}
