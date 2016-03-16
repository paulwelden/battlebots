'use strict';
var game = require('./gameState');
var actions = require('./actions');
var actionEval = require('./actionEval');
var projectileEval = require('./projectileEval');

module.exports = class gameEngine{

    static tick(game) {
        var actionsToDo = [];
        for (var botName in game.activeBots) {
            var bot = game.activeBots[botName];
            var action = new actions();
            bot.ai(game, action);
            actionsToDo[bot.name] = action;
        }

        //do projectile moves
        // Start with an initial array
        var array = ["a", "b", "c"];

        // Find and remove item from an array
        var i = array.indexOf("b");
        if(i != -1) {
            array.splice(i, 1);
        }
        for (var projectileKey in game.projectiles) {
            var projectile = game.projectiles[projectileKey];

            
            if(projectileEval.eval(projectile, game)) {
                //Remove projectile if we hit them
                var i = game.projectiles.indexOf(projectileKey);
                if(i != -1){
                    game.projectiles.splice(i,1);
                }
            }
        }

        for (var actionKey in actionsToDo) {
            var action = actionsToDo[actionKey];

            var bot = game.activeBots[actionKey];

            actionEval.eval(action, game.activeBots[actionKey], game);
        }
    }
}
