'use strict';
var game = require('./gameState');
var actions = require('./actions');
var actionEval = require('./actionEval');

module.exports = class gStateEngine{

    static tick(gState) {
        var actionsToDo = [];
        for (var botName in gState.activeBots) {
            var bot = gState.activeBots[botName];
            var action = new actions();
            bot.ai(gState, action);
            actionsToDo[bot.name] = action;
        }

        //do projectile moves
        for (var projectile in gState.projectiles) {
            projectileEval.eval(projectile, gState);
        }

        for (var actionKey in actionsToDo) {
            var action = actionsToDo[actionKey];

            var bot = gState.activeBots[actionKey];

            actionEval.eval(action, gState.activeBots[actionKey], gState);
        }
    }
}
