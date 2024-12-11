const test = require('tape');
const fs = require('fs/promises');

const jsonschema2mk = require("./");


test('index: test API', async function (t) {
	t.plan(1);

	const schema = JSON.parse(await fs.readFile("test/002-simple-number.json"));
	const expected = await fs.readFile("test/002-simple-number.md");

	const jsm = new jsonschema2mk({
		schema: undefined,
		level: undefined,
		extension: undefined,
		plugin: undefined,
		partials: undefined,
	});
	const output = jsm.convert(schema);

	t.equal(output+"\n", expected.toString());
});
