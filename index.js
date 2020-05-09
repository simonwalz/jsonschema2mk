#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var Handlebars = require('handlebars');

var level_plus = 0;

var global = [];

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
var jsmk_type_m = function(local) {
	var level = 1;
	if (local.path) {
		level = local.path.split(".").length + 1;
	}
	var level_s = "";
	for (var l=0; l<level+level_plus; l++) {
		level_s += "#";
	}
	local.level = level_s;

	Handlebars.registerHelper('escape', function(text) {
		var result = text.toString()
			.replace(/([\\`*_{}\[\]()#+.!-])/g, '\\$1');
		return new Handlebars.SafeString(result);
	});
	Handlebars.registerHelper('json', function (string) {
		var result = "```json\n"+
			JSON.stringify(string, undefined, "    ")+"\n"+
			"```";
		return new Handlebars.SafeString(result);
	});
	Handlebars.registerHelper('jsoninline', function (string) {
		var result = "`"+
			JSON.stringify(string).replace(/(`)/g, "\\$1")+
			"`";
		return new Handlebars.SafeString(result);
	});
	local.is_number = function() {
		//console.log(this);
		return this.type === "number" || this.type === "integer";
	};
	Handlebars.registerPartial("type",
		"<a name=\"{{{path_id}}}\"></a>\n"+
		"{{{level}}} {{#if path}}{{escape path}}: {{/if}}{{escape title}}\n"+
		"{{#if description}}\n"+
		"\n"+
		"{{{description}}}\n"+
		"{{/if}}\n"+
		"{{#if simple}}\n"+
		"\n"+
		"{{> simple simple}}\n"+
		"{{/if}}\n"+
		"{{#if object}}\n"+
		"\n"+
		"{{> object object}}\n"+
		"{{/if}}{{#if array}}\n"+
		"\n"+
		"{{> array array}}\n"+
		"{{/if}}\n"+
		"{{#each examples}}\n"+
		"\n"+
		"{{> example}}\n"+
		"{{/each}}\n");
	Handlebars.registerPartial("example",
		"\n"+
		"**Example**\n"+
		"\n"+
		"{{{json .}}}\n");
	Handlebars.registerPartial("simple",
		"**Type:** `{{{type}}}`"+
		"{{#if minimum}}<br/>\n"+
		"**Minimum:** `{{{minimum}}}`"+
		"{{/if}}"+
		"{{#if maximum}}<br/>\n"+
		"**Minimum:** `{{{maximum}}}`"+
		"{{/if}}"+
		"\n");
	Handlebars.registerPartial("object",
		"**Properties**\n" +
		"\n" +
		"|Name|Description|Type|Example|\n"+
		"|----|-----------|----|-------|\n"+
		"{{#each properties_table}}\n"+
		"|{{#if link}}[{{escape name}}]({{{link}}}){{else}}{{escape name}}{{/if}}|{{{description}}}|{{escape type}}|{{#each examples}}{{jsoninline .}} {{/each}}|\n"+
		"{{/each}}\n");
	Handlebars.registerPartial("array", "{{> type}}");

	var template = Handlebars.compile("{{> type}}");
	return template(local);
};
var jsmk_type_mk = function(local) {
	var s = "<a name=\"" + (local.path || "root") + "\"></a>\n";
	var level = 1;
	if (local.path) {
		level = local.path.split(".").length + 1;
	}
	for (var l=0; l<level+level_plus; l++) {
		s += "#";
	}

	s += " " + (local.path ? local.path + ": " : "") + local.title+"\n";
	if (local.description) {
		s += "\n" +
			local.description + "\n";
	}
	if (local.simple) {
		s += "\n" +
			jsmk_type_simple_mk(local.simple);
	}
	if (local.object) {
		s += "\n" +
			jsmk_type_object_mk(local.object);
	}
	if (local.array) {
		s += "\n" +
			jsmk_type_array_mk(local.array);
	}

	if (Array.isArray(local.examples)) {
		local.examples.forEach(function(example) {
			if (example && JSON.stringify(example) !== "{}") {
				s+= "\n" +
					"**Example**\n" +
					"\n" +
					"```json\n" +
					JSON.stringify(example, undefined,
						"    ") +
					"\n" +
					"```\n";
			}
		});
	}
	return s;
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
var jsmk_type_object_mk = function(local) {
	var s = "**Properties**\n" +
		"\n" +
		"|Name|Description|Type|Example|\n"+
		"|----|-----------|----|-------|\n";
	s += local.properties_table.map(function(t) {
		var s = "|";
		if (t.link) {
			s += "[" + t.name + "](" + t.link + ")";
		} else {
			s += t.name;
		}
		s += "|"+ (t.description||"-") +"|`"+t.type+"`|";
		if (Array.isArray(t.examples) && t.examples.length) {
			s+= "`" + JSON.stringify(
				examples_get(t.examples)
			)+"`";
		}
		s += "|";
		return s;
	}).join("\n") + "\n";

	return s;
};

var jsmk_type_array = function(schema, path) {
	var l_path = (path ? path+"." : "") + "items";
	var local = {
		items: jsmk_type(schema.items, l_path)
	};
	local.examples = schema.examples;
	return local;
};

var jsmk_type_array_mk = function(local) {
	return jsmk_type_m(local.items);
};

var jsmk_type_simple = function(schema, path) {
	/*var local = {
		"type": schema.type
	};*/
	var local = schema;
	return local;
};

var jsmk_type_simple_mk = function(local) {
	var s = "**Type:** `" + local.type + "`\n";
	if (local.type === "number" || local.type === "integer") {
		if (typeof local.minimum === "number") {
			s += "\n**Minimum:** `" + local.minimum + "`\n";
		}
		if (typeof local.maximum === "number") {
			s += "\n**Maximum:** `" + local.maximum + "`\n";
		}
	}
	return s;
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

