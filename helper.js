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

exports.mdlevel = function(path) {
	var level_plus = 0;

	var level = 1;
	if (path && path !== "root") {
		level = path.split(".").length + 1;
	}
	return new Handlebars.SafeString(
		"#".repeat(level+level_plus)
	);
};

exports.pathjoin = function(path, property_name, object) {
	return (path ? path+"." : "") + property_name +
		(object.type === "array" ? "[]" : "");
};

exports.jsmk_property = function(property, options) {
	var o = {
		...property,
		...options.hash,
	};
	if (!Array.isArray(o.examples) || !o.examples.length) {
		if (typeof property.default !== "undefined") {
			o.examples = [ property.default ];
		}
	}
	o.display_type = property.type;
	if (property.type === "array") {
		o.display_type = property.items.type + "[]";
	}

	if (property.type === "object" || property.type === "array") {
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
