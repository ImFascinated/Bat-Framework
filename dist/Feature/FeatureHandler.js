"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const FeatureBase_1 = __importDefault(require("./FeatureBase"));
const { promisify } = require('util');
const glob = promisify(require('glob'));
const path_1 = __importDefault(require("path"));
class FeatureHandler {
    /**
     * @description Constructs the {FeatureHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    constructor(instance, client) {
        this._features = new Map();
        this.init(instance, client, { directory: instance.featuresDirectory });
    }
    /**
     * @description Initializes the features, gets them ready within the {Client} and stores them into the _features Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    init(instance, client, options) {
        let { directory, silentLoad = false } = options;
        return glob(`${directory}\\**\\*.js`).then((features) => {
            for (const featureFile of features) {
                delete require.cache[featureFile];
                const { name } = path_1.default.parse(featureFile);
                const File = require(featureFile);
                if (!instance.utils.isClass(File))
                    throw new TypeError(`Feature ${name} doesn't export a class!`);
                const feature = new File(client, name);
                if (!(feature instanceof FeatureBase_1.default))
                    throw new TypeError(`Feature ${name} does not extend featureBase`);
                if (name === undefined)
                    continue;
                this.registerFeature(instance, client, feature, name);
            }
            if (!silentLoad) {
                if (this._features.size > 0) {
                    console.log(`BatFramework > Loaded ${this._features.size} feature${this._features.size > 1 ? 's' : ''}`);
                }
            }
        });
    }
    /**
     * @description Registers the {FeatureBase} and adds it to the _features Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {FeatureBase} feature - The {FeatureBase} passed into the method
     */
    registerFeature(instance, client, feature, name) {
        feature.init(instance, client);
        this._features.set(name, feature);
    }
}
module.exports = FeatureHandler;
