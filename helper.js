var Handlebars = require('handlebars');

exports.escape = function(text) {
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
