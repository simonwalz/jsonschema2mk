
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


var merge_examples = function(item) {
	if (Array.isArray(item.examples) && item.examples.length) {
		return examples_get(item.examples);
	}
	if (typeof item.default !== "undefined") {
		return item.default;
	}

	if (item.type === "object") {
		return merge_examples_object(item.properties);
	}
	if (item.type === "array") {
		if (Array.isArray(item.items)) {
			var e = [];
			item.items.forEach(function(itemelement, i) {
				var e_i = merge_examples(itemelement);
				if (e_i !== undefined)
					e[i] = e_i;
			});
			if (e.length) return e;
		} else if (typeof item.items === "object" &&
				item.items !== null) {
			var e = merge_examples(item.items);
			if (e !== undefined) return [e];
		}
	}
	return undefined;
};
var merge_examples_object = function(properties) {
	var e = {};
	for (var name in properties) {
		var property = properties[name];
		var v = merge_examples(property);
		if (typeof v !== "undefined") {
			e[name] = v;
		}
	}
	return e;
};

exports.get_example = function(item) {
	return merge_examples(item);
};

exports.get_examples = function(item) {
	if (Array.isArray(item.examples) && item.examples.length) {
		return item.examples;
	}
	if (typeof item.default !== "undefined") {
		return [ item.default ];
	}
	var m = merge_examples(item);
	if (m) return [ m ];
	return undefined;
};
