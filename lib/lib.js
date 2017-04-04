/**
 * Created by Armaldio on 04/04/2017.
 */

const ap   = require('c2-addon-parser');
const fs   = require("fs");
const path = require("path");
const ncp  = require('ncp').ncp;
const ICO  = require('icojs');

String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

let dir      = './tmp';
let template = './template';

class Addon {
	constructor () {
		this.data  = {};
		this.addon =
			{
				"is-c3-addon"   : true,
				"type"          : "plugin",
				"name"          : "My custom plugin",
				"id"            : "MyCustomPlugin",
				"version"       : "1.0.0.0",
				"author"        : "Scirra",
				"website"       : "https://www.construct.net",
				"documentation" : "https://www.construct.net",
				"description"   : "Example custom Construct 3 plugin.",
				"editor-scripts": [
					"plugin.js",
					"type.js",
					"instance.js"
				]
			}
	}

	/**
	 * Convert folder to name.c3addon
	 * @param from
	 * @param to
	 */
	convert (from, to) {
		this.data = ap.export(from, "json");
		//console.log(this.data.config);
		//console.log(this.data);
		//fs.writeFileSync(path.join(dir, "raw-actions.json"), JSON.stringify(this.data.actions, null, "\t"), "utf8");
		//fs.writeFileSync(path.join(dir, "raw-expressions.json"), JSON.stringify(this.data.expressions, null, "\t"), "utf8");
		//fs.writeFileSync(path.join(dir, "raw-conditions.json"), JSON.stringify(this.data.conditions, null, "\t"), "utf8");
		//fs.writeFileSync(path.join(dir, "raw-properties.json"), JSON.stringify(this.data.properties, null, "\t"), "utf8");

		//console.log(this.data.config);

		//Create directory if it doesnt' exists
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		if (!fs.existsSync(dir + "/c2runtime")) {
			fs.mkdirSync(dir + "/c2runtime");
		}

		if (!fs.existsSync(dir + "/lang")) {
			fs.mkdirSync(dir + "/lang");
		}

		//Copy current runtime.js
		fs.createReadStream(path.join(from, "/runtime.js"))
		  .pipe(fs.createWriteStream(path.join(dir, "/c2runtime/runtime.js")));

		this.addon["type"]          = this.data.config.addon_type;
		this.addon["name"]          = this.data.config.name;
		this.addon["id"]            = this.data.config.id;
		this.addon["version"]       = this.data.config.version;
		this.addon["author"]        = this.data.config.author;
		this.addon["website"]       = this.data.config.website;
		this.addon["documentation"] = this.data.config["help url"];
		this.addon["description"]   = this.data.config.description;

		//TODO trim spaces if needed
		this.addon["editor-scripts"].push(...this.data.config.dependency.split(","));

		//Write addon.js file
		fs.writeFileSync(path.join(dir, "addon.js"), JSON.stringify(this.addon, null, "\t"), 'utf8');

		//Edit plugin.js -----------------------------------------------------------------------------------------------
		let pluginjs = fs.readFileSync(path.join(template, "plugin.js"), "utf8");
		pluginjs     = pluginjs.replaceAll("{PLUGIN_ID}", this.addon.id);
		pluginjs     = pluginjs.replaceAll("{VERSION}", this.addon.version);
		pluginjs     = pluginjs.replaceAll("{CATEGORY}", this.data.config.category);
		pluginjs     = pluginjs.replaceAll("{AUTHOR}", this.addon.author);
		//TODO fix flags to be undefined and get flags and put singleglobal if is single global
		pluginjs     = pluginjs.replaceAll("{SINGLEGLOBAL}", this.addon.singleglobal);

		fs.writeFileSync(path.join(dir, "plugin.js"), pluginjs, "utf8");
		//TODO plugin properties

		//Edit type.js -----------------------------------------------------------------------------------------------
		let typejs = fs.readFileSync(path.join(template, "type.js"), "utf8");

		typejs = typejs.replaceAll("{PLUGIN_ID}", this.addon.id);

		fs.writeFileSync(path.join(dir, "type.js"), typejs, "utf8");

		//Edit instance.js -----------------------------------------------------------------------------------------------
		let instancejs = fs.readFileSync(path.join(template, "instance.js"), "utf8");

		instancejs = instancejs.replaceAll("{PLUGIN_ID}", this.addon.id);

		fs.writeFileSync(path.join(dir, "instance.js"), instancejs, "utf8");

		//Export icon to png
		const buffer = fs.readFileSync(path.join(from, 'Pluginicon.ico'));
		ICO.parse(buffer, 'image/png')
		   .then(images => {
			   //TODO Take the largest one
			   images.forEach(image => {
				   //const file = `${image.width}x${image.height}-${image.bit}bit.png`;
				   const file = `icon.png`;
				   const data = Buffer.from(image.buffer);
				   fs.writeFileSync(path.join(dir, file), data);
			   });
		   });

	}
}

module.exports = new Addon();