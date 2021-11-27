{{#if (isdefined additionalProperties)}}
{{#if (equal (type additionalProperties) "boolean")}}
**{{prefix_text}}Additional Properties:** {{#unless additionalProperties}}not {{/unless}}allowed<br/>
{{else}}
**{{prefix_text}}Additional Properties**

{{> object_property_header}}
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .) parent=.. name=@key)}}
{{/each}}

{{/if}}
{{/if~}}

{{#if (length properties) ~}}
**{{prefix_text}}Properties**({{length properties}})

{{> object_property_header}}
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key . ) parent=.. name=@key )}}
{{/each}}


{{#each properties ~}}
{{#if subschema}}

{{> schemaref . path=(pathjoinobj ../path @key . ) ~}}
{{else}}
{{> element . path=(pathjoinobj ../path @key . ) ~}}
{{/if}}
{{/each}}

{{/if}}



{{#if (length patternProperties) ~}}
**{{prefix_text}}Properties (Pattern)**

{{> object_property_header}}
{{#each patternProperties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .) parent=.. name=@key)}}
{{/each}}

{{#each patternProperties ~}}
{{#if subschema}}
{{> schemaref . path=(pathjoinobj ../path @key . ) ~}}
{{else}}
{{> element . path=(pathjoinobj ../path @key . ) ~}}
{{/if}}
{{/each}}


{{/if}}

{{#if (isdefined minProperties)}}
**{{prefix_text}}Minimal Properties:** {{escape minProperties}}<br/>
{{/if~}}
{{#if (isdefined maxProperties)}}
**{{prefix_text}}Maximal Properties:** {{escape maxProperties}}<br/>
{{/if~}}
{{#if (and (isdefined propertyNames) (isdefined propertyNames.pattern))}}
**{{prefix_text}}Property Name Pattern:** {{code propertyNames.pattern}}<br/>
{{/if~}}
