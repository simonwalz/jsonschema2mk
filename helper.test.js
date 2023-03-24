var test = require('tape');

const Helper = require('./helper.js');

test('helper: getid_objects', function (t) {
	t.plan(1);

	let o = {
		"$id": "/root",
		"type": "object",
		"properties": {
			"hallo": {
				"$id": "/hallo",
				"const": "welt"
			},
			"hi": {
				"const": "hi"
			},
			"abc": {
				"type": "array",
				"items": [
					{
						"$id": "/item1",
						"type": "string"
					},
					{
						"$id": "/item2",
						"type": "string"
					}
				]
			}
		}
	};
	let a = Helper.getid_objects(o);

	t.deepEqual(a,
		{"/root":{"$id":"/root","type":"object","properties":{"hallo":{"$id":"/hallo","const":"welt"},"hi":{"const":"hi"},"abc":{"type":"array","items":[{"$id":"/item1","type":"string"},{"$id":"/item2","type":"string"}]}}},"/hallo":{"$id":"/hallo","const":"welt"},"/item1":{"$id":"/item1","type":"string"},"/item2":{"$id":"/item2","type":"string"}}
	);

});
