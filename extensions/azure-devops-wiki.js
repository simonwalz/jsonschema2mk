
/*
 * UNTESTED UNTESTED UNTESTED
 * Please provide feedback in linked issue
 */

/**
 * Azure Devops Wiki uses differnt names for the internal links.
 * See: https://github.com/simonwalz/jsonschema2mk/issues/10
 */
module.exports = function(data, jsonschema2mk) {
	jsonschema2mk.Handlebars.registerHelper({
		mylink2: function (object, options) {
			if (object.link) {
				var link = object.link.replace(".", "%5C.") +
					"%3A-" + object.name.toLowerCase();
				return "[" + options.fn(object) + "](" +
					link + ")";
			}
			return options.fn(object);
		},
	});
	jsonschema2mk.Helper.tolink = function(link) {
		link = link.toUpperCase().replace(/[^a-zA-Z0-9#_-]/g, "");
		return link;
	};
};
