import { Client } from "discord.js";
import FeatureBase from "./FeatureBase";
import BatClient from '../Client/BatClient';
const { promisify } = require('util');
const glob = promisify(require('glob'));
import path from 'path';

type Options = {
	directory?: string,
	silentLoad?: boolean,
}

class FeatureHandler {
	private _features: Map<String, FeatureBase> = new Map();

	/**
	 * @description Constructs the {FeatureHandler} instance
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {Client} client - Discord.JS client
	 */

	constructor(instance: BatClient, client: Client) {
		this.init(instance, client, { directory: instance.featuresDirectory })
	}

	/**
	 * @description Initializes the features, gets them ready within the {Client} and stores them into the _features Map
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {Client} client - Discord.JS client
	 * @param {Options} options - The {Options} passed into the method
	 * @private
	 */

	private init(instance: BatClient, client: Client, options: Options) {
		let {
			directory,
			silentLoad = false
		} = options

		return glob(`${directory}\\**\\*.js`).then((features: any[]) => {
			for (const featureFile of features) {
				delete require.cache[featureFile];
				const { name } = path.parse(featureFile);
				const File = require(featureFile);
				if (!instance.utils.isClass(File)) throw new TypeError(`Feature ${name} doesn't export a class!`);
				const feature = new File(client, name);
				if (!(feature instanceof FeatureBase)) throw new TypeError(`Feature ${name} does not extend featureBase`);
				if (name === undefined) continue;
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

	public registerFeature(instance: BatClient, client: any, feature: FeatureBase, name: string) {
		feature.init(instance, client)
		this._features.set(name, feature)
	}
}

export = FeatureHandler;
