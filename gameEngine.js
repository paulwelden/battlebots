'use strict';
var game = require('./gameState');
var actions = require('./actions');
var actionEval = require('./actionEval');

module.exports = class gameEngine{

    static tick(game) {
        var actionsToDo = [];
        for (var botName in game.activeBots) {
            var bot = game.activeBots[botName];
            var action = new actions();
            console.log(bot);
            bot.ai(game, action);
            actionsToDo[bot.botName] = action;
            console.log(action);
        }

        //do projectile moves
        for (var projectile in game.projectiles) {
            projectileEval.eval(projectile, game);
        }

        for (var action in actionsToDo) {
            actionEval.eval(action, game.activeBots[botName], game);
            console.log("evaluated action");
        }

        
    }

}
