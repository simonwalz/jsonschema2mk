#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars').create();

Handlebars.registerHelper(require('./helper.js'));
Handlebars.registerHelper(require('./helper_examples.js'));
var partial_files = [
	"partials/element.md",
	"partials/type.md",
	"partials/example.md",
	"partials/simple.md",
	"partials/object.md",
	"partials/object_property.md",
	"partials/array.md",
	"partials/main.md",
];
partial_files.forEach(function(file) {
	Handlebars.registerPartial(
		path.basename(file, '.md'),
		fs.readFileSync(file, 'utf8') || ''
	);
});

var template = Handlebars.compile("{{> main}}");

var schema = JSON.parse(fs.readFileSync(argv.schema));

console.log(template({
	schema: schema,
}));
