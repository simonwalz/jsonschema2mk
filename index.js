#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseSchema(options) {
	const { schema } = options;

	if (schema && typeof schema === "object") {
		return schema;
	}

	const schemaPath = schema || "schema.json";
	return JSON.parse(fs.readFileSync(schemaPath));
}

var jsonschema2mk = function(options) {
	var _this = this;

	// TODO: copy structure:
	this.Helper = require('./helper.js');
	this.Handlebars = require('handlebars').create();

	this.Handlebars.registerHelper(this.Helper);
	this.Handlebars.registerHelper(require('./helper_examples.js'));

	this.load_partial_dir(__dirname + "/partials/");

	this.data = {
		schema: parseSchema(options),
		argv: options,
	};

	if (typeof options.level !== "undefined") {
		this.Helper.level_plus = options.level;
	}
	this.Helper.data = this.data;

	// Load internal extensions:
	if (options.extension) {
		if (!Array.isArray(options.extension)) {
			options.extension = [ options.extension ];
		}
		options.extension.forEach(function(extension) {
			if (typeof extension !== "string" ||
					!extension.match(/^[a-z0-9_-]+$/g)) {
				throw new Error("not a valid extension name");
			}
			require('./extensions/'+extension+'.js')(
					_this.data, _this);
		});
	}

	// Load external plugins:
	if (options.plugin) {
		if (!Array.isArray(options.plugin)) {
			options.plugin = [ options.plugin ];
		}
		options.plugin.forEach(function(plugin) {
			require(""+plugin)(_this.data, _this);
		});
	}

	// Load user defined partials
	if (options.partials) {
		if (!Array.isArray(options.partials)) {
			options.partials = [ options.partials ];
		}
		options.partials.forEach(function(partials) {
			_this.load_partial_dir(partials);
		});
	}
};
jsonschema2mk.prototype.load_partial_dir = function(dir) {
	var _this = this;
	var partial_files = fs.readdirSync(dir);
	partial_files.forEach(function(file) {
		_this.Handlebars.registerPartial(
			path.basename(file, '.md'),
			fs.readFileSync(dir + "/" + file, 'utf8') || ''
		);
	});
};
jsonschema2mk.prototype.generate = function() {
	if (!this._generate) {
		this._generate = this.Handlebars.compile("{{> main}}");
	}
	return this._generate.apply(this, arguments);
};

module.exports = jsonschema2mk;
