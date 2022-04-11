
const yaml = require("js-yaml");

module.exports = function(data, jsonschema2mk) {
	jsonschema2mk.Handlebars.registerHelper({
		yaml: function (string) {
			var result = "```yaml\n"+
			yaml.dump(string)+"\n"+
			"```";
			return new jsonschema2mk.Handlebars.SafeString(result);
		}
	});
	jsonschema2mk.load_partial_dir(__dirname + "/yaml-examples_partials");
};
