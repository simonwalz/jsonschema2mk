
const yaml = require("js-yaml");

module.exports = function(data, jsonschema2mk) {
	jsonschema2mk.Handlebars.registerHelper({
		yaml_dump: function (string) {
			var result = yaml.dump(string);
			return new jsonschema2mk.Handlebars.SafeString(result);
		}
	});
	jsonschema2mk.load_partial_dir(__dirname + "/front-matter_partials");
};
