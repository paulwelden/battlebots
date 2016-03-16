'use strict';
var game = require('./gameState');

module.exports = class gameEngine{

    static tick(game) {
        var actionsToDo = [];

        for (var bot in game.bots) {
            var action = new actions();
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
