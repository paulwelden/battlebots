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
            bot.ai(game, action);
            actionsToDo[bot.name] = action;
        }

        //do projectile moves
        for (var projectile in game.projectiles) {
            projectileEval.eval(projectile, game);
        }

        for (var actionKey in actionsToDo) {
            var action = actionsToDo[actionKey];

            var bot = game.activeBots[actionKey];

            actionEval.eval(action, game.activeBots[actionKey], game);
        }
    }
}
