'use strict';
var game = require('./gameState');
var actions = require('./actions');
var actionEval = require('./actionEval');
var projectileEval = require('./projectileEval');
var deepcopy = require('deepcopy');

module.exports = class gameEngine {

	static tick(game) {
		var actionsToDo = [];
		for (var botName in game.activeBots) {
			var bot = game.activeBots[botName];
			var action = new actions();
			bot.ai(bot, clone(game), action);

			actionsToDo[bot.name] = action;
			if (bot.shotCooldown > 0) {
				bot.shotCooldown--;
			}
		}
		var existingProjectiles = [];

		//do projectile moves
		for (var projectileKey in game.projectiles) {
			var projectile = game.projectiles[projectileKey];
			if (!projectileEval.eval(projectile, game)) {
				//We can keep the projectile
				existingProjectiles.push(projectile);
			}
		}
		game.projectiles = existingProjectiles;
		for (var actionKey in actionsToDo) {
			var action = actionsToDo[actionKey];

			var bot = game.activeBots[actionKey];

			actionEval.eval(action, game.activeBots[actionKey], game);
		}

		function clone(orig) {
			let origProto = Object.getPrototypeOf(orig);
			return Object.assign(Object.create(origProto), orig);
		}

	}

}
