#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars').create();

var global = [];

Handlebars.registerHelper(require('./helper.js'));
var partial_files = [
	"partials/type.md",
	"partials/example.md",
	"partials/simple.md",
	"partials/object.md",
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

var jsmk_type_m = function(local) {
	return template(local);
};

var examples_get = function(examples) {
	if (!Array.isArray(examples) || !examples.length) {
		return undefined;
	}
	return examples[0];
	/*
	// pick example randomly:
	if (examples.length == 1) {
		return examples[0];
	}
	return examples[Math.floor(Math.random()*examples.length)];
	*/
};

var jsmk_type = function(schema, path) {
	var local = {
		title: schema.title,
		description: schema.description,
		examples: schema.examples,
		path: path,
		path_id: path || "root",
	};
	if (schema.type === "string" ||
			schema.type === "number" ||
			schema.type === "integer" ||
			schema.type === "null" ||
			schema.type === "boolean") {
		local.simple = jsmk_type_simple(schema);
	}
	if (schema.type === "object") {
		local.object = jsmk_type_object(schema, path);
		if (!Array.isArray(local.examples) || !local.examples.length) {
			local.examples = local.object.examples;
		}
	}
	if (schema.type === "array") {
		local.array = jsmk_type_array(schema, path);
		if (!Array.isArray(local.examples) || !local.examples.length) {
			local.examples = local.array.examples;
		}
	}
	// type === "array"
	return local;
};

var jsmk_type_object = function(schema, path) {
	var local = {
		properties_table: []
	};
	var example = {};
	for (var property_name in schema.properties) {
		var property = schema.properties[property_name];
		var l_path = (path ? path+"." : "") + property_name;
		var o = {
			name: property_name,
			description: property.description || property.title,
			type: property.type,
			examples: property.examples
		};
		if (!Array.isArray(o.examples) || !o.examples.length) {
			if (typeof property.default !== "undefined") {
				o.examples = [ property.default ];
			}
		}
		example[property_name] = examples_get(o.examples);
		if (property.type === "object") {
			o.link = "#" + l_path;
			var sub_local = jsmk_type(property, l_path);
			global.push(sub_local);
			if (!Array.isArray(o.example) || !o.example.length) {
				example[property_name] =
					examples_get(sub_local.examples);
			}
		}
		if (property.type === "array") {
			l_path += "-items";
			o.link = "#" + l_path;
			var sub_local = jsmk_type(property.items, l_path);
			global.push(sub_local);
			o.type = property.items.type + "[]";

			if (typeof o.example === "undefined") {
				example[property_name] = [
					examples_get(sub_local.examples)
				];
			}
		}
		local.properties_table.push(o);
	}
	local.examples = schema.examples || [ example ];
	console.log("example", local.examples);
	return local;
};

var jsmk_type_array = function(schema, path) {
	var l_path = (path ? path+"." : "") + "items";
	var local = {
		items: jsmk_type(schema.items, l_path)
	};
	local.examples = schema.examples;
	return local;
};

var jsmk_type_simple = function(schema, path) {
	/*var local = {
		"type": schema.type
	};*/
	var local = schema;
	return local;
};

//var schema = require("../osiota-app-debug-output/schema.json");
var schema = JSON.parse(fs.readFileSync(argv.schema));

//var schema = require("./test-schema-simple.json");
console.log(jsmk_type_m(jsmk_type(schema)));

console.log(
	global.map(function(item) {
		return jsmk_type_m(item);
	}).join("\n")
);

