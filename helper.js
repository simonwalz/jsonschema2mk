var Handlebars = require('handlebars');

exports.br = function() {
	//return new Handlebars.SafeString("<br/>");
	return new Handlebars.SafeString("  ");
};

exports.or = function(a, b) {
	return a || b;
};

exports.and = function(a, b) {
	return a && b;
};

exports.gettype = function(value) {
	if (Array.isArray(value)) return "array";
	return typeof value;
};

exports.isdefined = function(value) {
	if (typeof value === "undefined" || value === null)
		return false;
	return true;
};

exports.escape = function(text) {
	if (typeof text === "undefined" || text === null) return "";
	var result = text.toString()
		.replace(/([\|\\`*_{}\[\]()#+.!-])/g, '\\$1');
	return new Handlebars.SafeString(result);
};

exports.json = function (string) {
	var result = "```json\n"+
		JSON.stringify(string, undefined, "    ")+"\n"+
		"```";
	return new Handlebars.SafeString(result);
};

exports.code = function (string) {
	if (typeof string === "undefined") return "";
	if (!Array.isArray(string))
		string = [ string ];
	var result = string.map(function(s) {
		return "`"+
			s.toString().replace(/(`)/g, "\\$1")+
			"`";
	}).join(", ");
	return new Handlebars.SafeString(result);
};

exports.jsoninline = function (string) {
	if (typeof string === "undefined") return "";
	if (Array.isArray(string)) {
		var result = string.map(function(elem) {
			return exports.jsoninline(elem);
		}).join(", ");
		return new Handlebars.SafeString(result);
	}
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

exports.pathjoinobj = function(path, property_name, object) {
	if (property_name === "") {
		path = (path ? path : "item");
	} else {
		path = (path ? path+"." : "") + property_name;
	}
	path = path + (exports.is_type(object.type, "array") ? "[]" : "");
	// dont increment level on oneOf, anyOf, allOf, not:
	return path.replace(/: \./, ": ");
}
exports.pathjoin = function(path, property_name, object) {
	if (property_name === "") {
		path = (path ? path : "item");
	} else {
		path = (path ? path+"." : "") + property_name;
	}
	// dont increment level on oneOf, anyOf, allOf, not:
	return path.replace(/: \./, ": ");
};

exports.jsmk_property = function(property, options) {
	property = exports.getref(property);
	var o = {
		...property,
		...options.hash,
	};
	if (!Array.isArray(o.examples) || !o.examples.length) {
		if (typeof o.default !== "undefined") {
			o.examples = [ o.default ];
		}
	}
	o.display_type = o.type;
	if (exports.is_type(o.type, "array")) {
		o.display_type = "array";
		if (typeof o.items === "object" && o.items !== null &&
				typeof o.items.type === "string") {
			o.display_type = o.items.type + "[]";
		}
	}

	if (exports.is_type(o.type, "object") ||
			exports.is_type(o.type, "array")) {
		exports.push_ref_item(o);
		o.link = "#"+o.path;
	}

	if (typeof o.required === "undefined" &&
			typeof o.parent === "object" && o.parent !== null &&
			Array.isArray(o.parent.required)) {
		o.required = o.parent.required.includes(o.name);
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
	if (object.link) {
		var link = exports.tolink(object.link);
		return new Handlebars.SafeString(
			"["+options.fn(object)+"]("+link+")");
	}
	return options.fn(object);
};
exports.tolink = function(link) {
	link = link.toLowerCase().replace(/[^a-zA-Z0-9#_-]/g, "");
	return link;
}

exports.plus = function(a, b) {
	return a + b;
};

exports.length = function(object) {
	if (Array.isArray(object)) {
		return object.length;
	}
	if (typeof object === "object" && object !== null) {
		return Object.keys(object).length;
	}
	if (typeof object !== "undefined") {
		return true;
	}
	return false;
};

exports.getref = function(object) {
	if (typeof object['$ref'] === "string") {
		var o = exports.data.schema;
		var path = object['$ref'].replace(/^#\//, '');
		path.split(/\//).forEach(function(p) {
			if (o.hasOwnProperty(p) &&
					typeof o[p] === "object" &&
					o[p] !== null) {
				o = o[p];
			} else {
				throw new Error("ref not found.");
			}
		});
		o.path = path;
		return o;
	}
	return object;
};

exports.noproperties = function(object) {
	if (!exports.is_type(object.type, "object") &&
			!exports.is_type(object.type, "array"))
		return false;
	if (exports.length(object.properties) ||
			exports.length(object.patternProperties) ||
			( exports.length(object.additionalProperties) &&
			  object.additionalProperties !== false ) ||
			object.additionalProperties === true ||
			exports.length(object.items) ||
			exports.length(object.contains) ||
			exports.length(object.oneOf) ||
			exports.length(object.anyOf) ||
			exports.length(object.allOf)) {
		return false;
	}
	return true;
};

exports.title_isnot_name = function(object) {
	if (typeof object.title !== "string") return true;
	if (typeof object.name !== "string") return true;
	var name = object.name;
	var title = object.title.replace(/[^a-zA-Z]/g, '_').toLowerCase();
	var title_camelcase = object.title.replace(/[^a-zA-Z]/, '');
	var title_camelcase_lower = title_camelcase.charAt(0).toLowerCase() +
			title_camelcase.slice(1)
	var title_camelcase_upper = title_camelcase.charAt(0).toUpperCase() +
			title_camelcase.slice(1)

	if (name === title) return false;
	if (name === title_camelcase_lower) return false;
	if (name === title_camelcase_upper) return false;
	return true;
};

exports.firstline = function(string, object) {
	if (object.link) {
		var result = string.toString()
			.replace(/(?:\n|<br\/>)(?:.|\n)*$/, "")
			.replace(/([\|])/g, '\\$1');
		return new Handlebars.SafeString(result);
	}
	var result = string.toString().replace(/\n/g, "<br/>")
			.replace(/([\|])/g, '\\$1');
	return new Handlebars.SafeString(result);
};

exports.is_type = function(type, pattern) {
	if (Array.isArray(type))
		return type.includes(pattern);
	return type === pattern;
};
