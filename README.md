# JSON schema to markdown generator (jsonschema2mk)

This project allows to generate documentation from [json-schema](https://json-schema.org).


### Supported JSON schema features

  * Basic attributes:
    * title, description, default, examples
    * enum, const
    * deprecated
  * number, integer
    * minimum, maximum, exclusiveMinimum, exclusiveMaximum
    * multipleOf
  * string
    * minLength, maxLength
    * format
    * pattern
    * contentMediaType
    * contentEncoding
  * boolean
  * null
  * object
    * properties
    * additionalProperties (as boolean and as object)
    * patternProperties
    * required
    * minProperties, maxProperties
    * propertyNames.pattern
  * array
    * items (schema)
    * items (array of schemas)
    * minItems, maxItems
    * uniqueItems
    * contains
    * minContains, maxContains
  * allOf, oneOf, anyOf, not


### Missing JSON schema features

  * if, then, else
  * object: dependencies (Properties and Schema)


## Install & Usage

```sh
npm install jsonschema2mk
```

Generate DOC.md:

```sh
npx jsonschema2mk --schema schema.json >DOC.md
```

Add partials:

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

Example to add partials:

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
