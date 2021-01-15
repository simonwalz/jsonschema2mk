#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

var jsonschema2mk = function(options) {
	// TODO: copy structure:
	this.Helper = require('./helper.js');
	this.Handlebars = require('handlebars').create();

	this.Handlebars.registerHelper(this.Helper);
	this.Handlebars.registerHelper(require('./helper_examples.js'));

	this.load_partial_dir(__dirname + "/partials/");
	if (options.partials) {
		this.load_partial_dir(options.partials);
	}

	this.data = {
		schema: JSON.parse(fs.readFileSync(
				options.schema || "schema.json")),
		argv: options,
	};

	if (typeof options.level !== "undefined") {
		this.Helper.level_plus = options.level;
	}
	this.Helper.data = this.data;

	if (options.plugin) {
		require(options.plugin)(this.data, this);
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
