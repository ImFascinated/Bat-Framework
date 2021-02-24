import path from "path";

class Utils {
	isClass(input: any) {
		console.log(input.toString().substring(0, 5))
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		if (require.main === undefined) return;
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}
}

export = Utils;