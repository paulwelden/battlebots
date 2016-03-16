"use strict";

class gameState {
  constructor() {
    this.activeBots = [];
  }

  static createBot(name, color, type, ai) {
    var startingPosition = determineStartingPosition();
    var bot;
    switch(type) {
      case "blueBot":
      bot = new Bot(name, color, startingPosition, ai);
      break;
      default:
      bot = new Bot(name, color, startingPosition, ai);
    }
    return bot;
  }

  static determineStartingPosition() {
    var x = Math.floor((Math.rand() * (constants.WORLD_WIDTH -
        (constants.BOT_SIZE / 2)) + (constants.BOT_SIZE / 2));
    var y = Math.floor((Math.rand() * (constants.WORLD_WIDTH -
        (constants.BOT_SIZE / 2)) + (constants.BOT_SIZE / 2));
    var coord = new Coordinate(x, y);
    return coord;
  }
}
