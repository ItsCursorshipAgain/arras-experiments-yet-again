const { Siege } = require("./gamemode_setup/siege.js");
const { Assault } = require("./gamemode_setup/assault.js");
const { Tag } = require("./gamemode_setup/tag.js");
const { Domination } = require("./gamemode_setup/dominator.js");
const { Mothership } = require("./gamemode_setup/mothership.js");
const { Sandbox } = require("./gamemode_setup/sandbox.js");
const { Train } = require("./gamemode_setup/trainwars.js");
const { Maze } = require("./gamemode_setup/maze.js");
const { Outbreak } = require("./gamemode_setup/outbreak.js");
const { ClanWars } = require("./gamemode_setup/clan_wars.js");

class gamemodeManager {
    constructor() {
        this.gameSiege = new Siege(global.gameManager);
        this.gameAssault = new Assault(global.gameManager);
        this.gameTag = new Tag(global.gameManager);
        this.gameDomination = new Domination(global.gameManager);
        this.gameMothership = new Mothership(global.gameManager);
        this.gameSandbox = new Sandbox(global.gameManager);
        this.gameMaze = new Maze(global.gameManager, null);
        this.gameTrain = new Train();
        this.gameOutbreak = new Outbreak(global.gameManager);
        this.gameClanwars = new ClanWars(global.gameManager);
    }

    request(type) {
        if (type == "start") {
            if (Config.special_boss_spawns) this.gameSiege.start(Config.maze_type ?? false);
            if (Config.assault) this.gameAssault.start();
            if (Config.tag) Config.tag_data.initAndStart();
            if (Config.domination) this.gameDomination.start();
            if (Config.mothership) this.gameMothership.start();
            if (Config.maze_type !== undefined && !Config.special_boss_spawns) this.gameMaze.generate();
            if (Config.outbreak) this.gameOutbreak.start();
        }
        if (type == "loop") {
            global.gameManager.lagLogger.set();
            if (Config.special_boss_spawns) this.gameSiege.loop();
            if (Config.mothership) this.gameMothership.loop();
            global.gameManager.lagLogger.mark();
            if (global.gameManager.lagLogger.totalTime > 100) {
                console.log("Gamemode loop is taking a long time!");
                console.log(`Gamemode loop took ${global.gameManager.lagLogger.totalTime}ms to complete!`);
                console.log(`Gamemode loop log history: (Last ${global.gameManager.lagLogger.sum.length} entries)`);
                console.log(global.gameManager.lagLogger.sum.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
            }
        }
        if (type == "quickloop") { // Mainly for sandbox and trainwars only, but you can also put your own gamemode loop here incase the regular loop doesnt fit.
            if (Config.sandbox) this.gameSandbox.update();
            if (Config.train) this.gameTrain.loop();
        }
    }

    terminate() {
        if (Config.special_boss_spawns) this.gameSiege.reset();
        if (Config.assault) this.gameAssault.reset();
        if (Config.tag) Config.tag_data.resetAndStop();
        if (Config.domination) this.gameDomination.reset();
        if (Config.mothership) this.gameMothership.reset();
        if (Config.clan_wars) this.gameClanwars.reset();
    }

    redefine(theshit) {
        this.gameSiege.redefine(theshit);
        this.gameAssault.redefine(theshit);
        this.gameTag.redefine(theshit);
        this.gameSandbox.redefine(theshit);
        this.gameMaze.redefine(Config.maze_type);
        this.gameClanwars.redefine(theshit);
    }
}

module.exports = { gamemodeManager };