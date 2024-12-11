#!/usr/bin/env node

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const jsonschema2mk = require("./");

var schema_file = "schema.json";
if (typeof argv.schema === "string") {
	schema_file = argv.schema;
}
const schema = JSON.parse(fs.readFileSync(schema_file));

const jsm = new jsonschema2mk(argv);
console.log(jsm.convert(schema));
