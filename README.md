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

module.exports = function(data, load_partial_dir, Handlebars, Helper, template){
        load_partial_dir(__dirname + "/partials");
};
```
