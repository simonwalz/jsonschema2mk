#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars').create();
var Helper = require('./helper.js');

Handlebars.registerHelper(Helper);
Handlebars.registerHelper(require('./helper_examples.js'));

var load_partial_dir = function(dir) {
	var partial_files = fs.readdirSync(dir);
	partial_files.forEach(function(file) {
		Handlebars.registerPartial(
			path.basename(file, '.md'),
			fs.readFileSync(dir + "/" + file, 'utf8') || ''
		);
	});
};
load_partial_dir(__dirname + "/partials/");
if (argv.partials) {
	load_partial_dir(argv.partials);
}

var data = {
	schema: JSON.parse(fs.readFileSync(argv.schema)),
	argv: argv,
};

if (typeof argv.level !== "undefined") {
	Helper.level_plus = argv.level;
}

if (argv.plugin) {
	require(argv.plugin)(data, load_partial_dir, Handlebars, Helper);
}

var template = Handlebars.compile("{{> main}}");
console.log(template(data));

