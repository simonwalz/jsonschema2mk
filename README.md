# JSON schema to markdown generator (jsonschema2mk)

This project allows to generate documentation from [JSON Schema](https://json-schema.org) spezifications.

Examples:

  * [Configuration osiota ArtNet app](test/010-example-artnet.md) ([see project](https://github.com/osiota/osiota-app-artnet/blob/master/README.md))
  * [Configuration osiota Modbus app](test/011-example-modbus.md) ([see project](https://github.com/osiota/osiota-app-modbus/blob/master/README.md))

### Supported JSON schema features

  * Basic attributes:
    * title, description, default, examples
    * enum, const
    * deprecated
    * $ref locally
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
  * allOf, oneOf, anyOf, not (not for object properties)
  * multiple types (`type: ["string", "null"]`)


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

Overwrite some partials with own partials:

```sh
npx jsonschema2mk --schema schema.json --partials dir/ >DOC.md
```

## Add to your project

Add to package.json:

```json
{
	"scripts": {
		"doc": "jsonschema2mk --schema schema.json >DOC.md"
	}
}
```

and run `npm run doc`.

## Command line options

Usage:

```sh
npx jsonschema2mk [<options>] >DOC.md
```

<table>
  <thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>--schema schema.json</code></td>
    <td>Specify a JSON Schema file to convert.<br/>Default: <code>schema.json</code></td>
  </tr>
  <tr>
    <td><code>--partials dir</code></td>
    <td>Overwrite partials from dir. You can overwrite every partial (see directory partials/) or define own ones. This option can be used multiple times.</td>
  </tr>
  <tr>
    <td><code>--extension ext</code></td>
    <td>Load feature extension. See <a href="#internal-feature-extensions-option-extension">section</a>. This option can be used multiple times.</td>
  </tr>
  <tr>
    <td><code>--plugin p</code></td>
    <td>Load plugin. See <a href="#load-external-plugins-option-plugin">section</a>. This option can be used multiple times.</td>
  </tr>
  <tr>
    <td><code>--level number</code></td>
    <td>Initial Markdown heading level. Defaul is Zero.</td>
  </tr>
  </tbody>
</table>


### Internal Feature Extensions (Option extension)

You can load feature extensions if needed.

Implemented Extensions:

  * `table-format-2`: Show tables with the columns *name*, *type*, *title*, *description* and *required*. Default is to display a combined *name* and *title* column. See [example output](test/010-example-artnet-table2.md).
  * `yaml-examples`: Show examples in YAML format.
  * `front-matter`: Add a [front matter block](https://jekyllrb.com/docs/front-matter/).<br/>You can define the front-matter with `--fm.para1 value1 --fm.para2 value2`

Example Calls:

```sh
# table-format 2
npx jsonschema2mk --schema schema.json \
	--extension table-format-2 >DOC.md
# yaml-examples
npx jsonschema2mk --schema schema.json \
	--extension yaml-examples >DOC2.md
# yaml-examples and front matter
npx jsonschema2mk --schema schema.json \
	--extension yaml-examples \
	--extension front-matter --fm.parent Reference --fm.nav_order 1 >DOC3.md
```


### Load External Plugins (Option plugin)

If partial overwriting is not enogh (see above), you can load plugins.

In the plugin, you can load your own partials. It has the same API as extensions.

The Arguments Vector is available via `data.argv`.

Example:

```js
module.exports = function(data, jsonschema2mk) {
	jsonschema2mk.load_partial_dir(__dirname + "/partials");
};
```


Call it via:

```sh
npx jsonschema2mk --schema schema.json --plugin my-plugin.js >DOC.md
```



## Usage as Libray

You can integration this code as Library. See `cli.js` for an example.

## Examples

The README.md files of all applications of the [osiota project](https://github.com/osiota/) are generated with the help of this program. See the adaption script in the [osiota-dev repository](https://github.com/osiota/osiota-dev/blob/master/doc-jsonschema) as well.

Examples:

  * [osiota-app-modbus](https://github.com/osiota/osiota-app-modbus)
  * [osiota-app-onewire](https://github.com/osiota/osiota-app-onewire)


## License

This software is released under the MIT license.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
