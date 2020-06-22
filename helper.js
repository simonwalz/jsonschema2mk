var Handlebars = require('handlebars');

exports.or = function(a, b) {
	return a || b;
};

exports.isdefined = function(value) {
	if (typeof value === "undefined" || value === null)
		return false;
	return true;
};

exports.escape = function(text) {
	if (typeof text === "undefined" || text === null) return "";
	var result = text.toString()
		.replace(/([\\`*_{}\[\]()#+.!-])/g, '\\$1');
	return new Handlebars.SafeString(result);
};

exports.json = function (string) {
	var result = "```json\n"+
		JSON.stringify(string, undefined, "    ")+"\n"+
		"```";
	return new Handlebars.SafeString(result);
};

exports.jsoninline = function (string) {
	if (typeof string === "undefined") return "";
	var result = "`"+
		JSON.stringify(string).replace(/(`)/g, "\\$1")+
		"`";
	return new Handlebars.SafeString(result);
};

exports.equal = function(a, b) {
	return a === b;
};

exports.repeat = function(string, times) {
	return string.toString().repeat(times);
};

exports.regexp = function(text, regexp, new_str) {
	var r = new RegExp(regexp);
	return text.toString().replace(r, new_str);
};
exports.regexpTest = function(text, regexp) {
	if (typeof text === "undefined" || text === null) return false;
	var r = new RegExp(regexp);
	return r.test(text.toString());
};

exports.level_plus = 0;
exports.mdlevel = function(path, options) {
	var level = 1;
	if (path && path !== "root") {
		level = path.split(/\./).length + 1;
	}
	if (options.hash.plus) {
		level += options.hash.plus;
	}
	return new Handlebars.SafeString(
		"#".repeat(level+exports.level_plus)
	);
};

exports.pathjoin = function(path, property_name, object) {
	if (property_name === "") {
		path = (path ? path : "item") +
			(object.type === "array" ? "[]" : "");
	} else {
		path = (path ? path+"." : "") + property_name +
			(object.type === "array" ? "[]" : "");
	}
	// dont increment level on oneOf, anyOf, allOf, not:
	return path.replace(/: \./, ": ");
};

exports.jsmk_property = function(property, options) {
	var o = {
		...property,
		...options.hash,
	};
	o = exports.getref(o);
	if (!Array.isArray(o.examples) || !o.examples.length) {
		if (typeof o.default !== "undefined") {
			o.examples = [ o.default ];
		}
	}
	o.display_type = o.type;
	if (o.type === "array") {
		o.display_type = o.items.type + "[]";
	}

	if (o.type === "object" || o.type === "array") {
		exports.push_ref_item(o);
		o.link = "#"+o.path;
	}

	return o;
};

var ref_items = [];

exports.get_ref_items = function() {
	var r = ref_items;
	ref_items = [];
	return r;
};

exports.push_ref_item = function(item) {
	if (ref_items.filter(function(ri) {
		return ri.path === item.path;
	}).length) {
		return;
	}
	ref_items.push(item);
	return "";
};

exports.mylink = function(object, options) {
	/*
	if (object.type === "object" || object.type === "array") {
		exports.push_ref_item(object);
		return new Handlebars.SafeString(
			"["+options.fn(object)+"](#"+object.path+")");
	}*/

	if (object.link) {
		return new Handlebars.SafeString(
			"["+options.fn(object)+"]("+object.link+")");
	}
	return options.fn(object);
};

exports.plus = function(a, b) {
	return a + b;
};

exports.length = function(object) {
	if (typeof object === "object" && object !== null) {
		return Object.keys(object).length;
	}
	return false;
};

exports.getref = function(object) {
	if (typeof object['$ref'] === "string") {
		var o = exports.data.schema;
		var path = object['$ref'].replace(/^#\//, '');
		path.split(/\//)
				.forEach(function(p) {
			o = o[p];
		});
		o.path = path;
		return o;
	}
	return object;
};
