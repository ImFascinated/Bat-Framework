import path from "path";

class Utils {
	isClass(obj: any): boolean {
		const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class'
		//console.log(`Class: ${obj.name} Constructor Name: ${obj.constructor}`)
	if (obj.prototype === undefined) {
		return isCtorClass
	}
	const isPrototypeCtorClass = obj.prototype.constructor && obj.prototype.constructor.toString && obj.prototype.constructor.toString().substring(0, 5) === 'class'
	return isCtorClass || isPrototypeCtorClass
}

	get directory() {
		if (require.main === undefined) return;
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}
}

export = Utils;