"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var promisify = require('util').promisify;
var glob = promisify(require('glob'));
var path_1 = __importDefault(require("path"));
var CommandBase_1 = __importDefault(require("./CommandBase"));
var CommandHandler = /** @class */ (function () {
    function CommandHandler(instance, client) {
        var _this = this;
        this._commands = new Map();
        this.init(instance, client, { directory: instance.commandsDirectory });
        // TODO: Move this to a built-in event.
        client.on('message', function (message) {
            if (!message.guild || message.author.bot)
                return;
            var prefix = '!'; // TODO: Add guild prefixes
            if (!message.content.startsWith(prefix))
                return;
            var _a = message.content.slice(prefix.length).trim().split(/ +/g), cmd = _a[0], args = _a.slice(1);
            var command = _this.getCommandByName(cmd);
            if (command) {
                command.run(message, args);
            }
        });
    }
    CommandHandler.prototype.init = function (instance, client, options) {
        var _this = this;
        var directory = options.directory, _a = options.silentLoad, silentLoad = _a === void 0 ? false : _a;
        return glob(directory + "\\**\\*.js").then(function (events) {
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var commandFile = events_1[_i];
                delete require.cache[commandFile];
                var name_1 = path_1.default.parse(commandFile).name;
                var File_1 = require(commandFile);
                if (!instance.utils.isClass(File_1))
                    throw new TypeError("BatFramework > Command " + name_1 + " doesn't export a class!");
                var command = new File_1(client, name_1.toLowerCase());
                if (!(command instanceof CommandBase_1.default))
                    throw new TypeError("BatFramework > Command " + name_1 + " does not extend CommandBase");
                if (!command.name) {
                    throw new Error("BatFramework > Command " + name_1 + " doesn't have a name, and therefore cannot be used!");
                }
                var missing = [];
                if (!command.description) {
                    missing.push("Description");
                }
                if (!command.category) {
                    missing.push("Category");
                }
                if (missing.length > 0 && instance.showWarns) {
                    console.warn("BatFramework > Command \"" + command.name + "\" is missing the following properties: " + missing.join(', '));
                }
                _this.registerCommand(command, command.name.toLowerCase());
            }
            if (!silentLoad) {
                console.log("BatFramework > Loaded " + _this._commands.size + " commands.");
            }
        });
    };
    CommandHandler.prototype.registerCommand = function (command, name) {
        this._commands.set(name, command);
    };
    CommandHandler.prototype.getCommandByName = function (name) {
        var toReturn;
        this._commands.forEach(function (command) {
            if (toReturn)
                return toReturn;
            if (command.name === name)
                toReturn = command;
            command.aliases.forEach(function (alias) {
                if (alias === name)
                    toReturn = command;
            });
        });
        return toReturn;
    };
    Object.defineProperty(CommandHandler.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        enumerable: false,
        configurable: true
    });
    return CommandHandler;
}());
module.exports = CommandHandler;
