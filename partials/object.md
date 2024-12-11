{{#if (length properties) ~}}
**{{prefix_text}}Properties**

{{> object_property_header}}
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .) parent=.. name=@key)}}
{{/each}}

{{/if}}
{{#if (length patternProperties) ~}}
**{{prefix_text}}Properties (Pattern)**

{{> object_property_header}}
{{#each patternProperties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .) parent=.. name=@key)}}
{{/each}}

{{/if}}
{{#if (isdefined additionalProperties)}}
{{#if (equal (gettype additionalProperties) "boolean")}}
**{{prefix_text}}Additional Properties:** {{#unless additionalProperties}}not {{/unless}}allowed{{br}}
{{else}}
**{{prefix_text}}Additional Properties**

{{> object_property_header}}
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .) parent=.. name=@key)}}
{{/each}}

{{/if}}
{{/if~}}

{{#if (isdefined minProperties)}}
**{{prefix_text}}Minimal Properties:** {{escape minProperties}}{{br}}
{{/if~}}
{{#if (isdefined maxProperties)}}
**{{prefix_text}}Maximal Properties:** {{escape maxProperties}}{{br}}
{{/if~}}
{{#if (and (isdefined propertyNames) (isdefined propertyNames.pattern))}}
**{{prefix_text}}Property Name Pattern:** {{code (escapeRegexp propertyNames.pattern)}}{{br}}
{{/if~}}
{{#if (isdefined dependentRequired)}}
{{#each dependentRequired}}
**{{prefix_text}}If property *{{@key}}* is defined**, property/ies {{#each this}}*{{this}}*{{#unless @last}}, {{/unless}}{{/each}} is/are required.{{br}}
{{/each}}
{{/if~}}
{{#if (isdefined dependentSchemas)}}
{{#each dependentSchemas}}
**{{prefix_text}}If property *{{@key}}* is defined**:

{{> element_part this type=(or type ../type) path=(pathjoin path (plus "dependentSchemas " @key))}}

{{/each}}
{{/if~}}
