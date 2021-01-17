# JSON schema to markdown generator (jsonschema2mk)

This project allows to generate documentation from [json-schema](https://json-schema.org).

<!--
Supports:
* properties
* all-of
* one-of
* ...
-->

## Install & Usage

```sh
npm install jsonschema2mk
```

Generate DOC.md:

```sh
npx jsonschema2mk --schema schema.json >DOC.md
```

Overwrite partials:

```sh
npx jsonschema2mk --schema schema.json --partials dir/ >DOC.md
```

## Add to package.json

```json
{
	"scripts": {
		"doc": "jsonschema2mk --schema schema.json >DOC.md"
	}
}
```

## Plugins:

Example to overwrite partials:

```js
const fs = require("fs");

module.exports = function(data, jsonschema2mk) {
	jsonschema2mk.load_partial_dir(__dirname + "/partials");
};
```

## Use as lib:

See `cli.js`

## Examples:

The README.md files of all applications of the [osiota project](https://github.com/osiota/) are generated with the help of this program. See the adaption script in the [osiota-dev repository](https://github.com/osiota/osiota-dev/blob/master/doc-jsonschema) as well.

Examples:

  * [osiota-app-modbus](https://github.com/osiota/osiota-app-modbus)
  * [osiota-app-onewire](https://github.com/osiota/osiota-app-onewire)
