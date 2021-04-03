{{#if (length properties) ~}}
**{{prefix_text}}Properties**

|Name|Description|Type|
|----|-----------|----|
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .)) name=@key}}
{{/each}}

{{/if}}
{{#if (length patternProperties) ~}}
**{{prefix_text}}Properties (Pattern)**

|Name|Description|Type|
|----|-----------|----|
{{#each patternProperties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .)) name=@key}}
{{/each}}

{{/if}}
{{#if (isdefined required)}}
**{{prefix_text}}Required Properties:** {{escape required}}<br/>
{{/if~}}
{{#if (isdefined additionalProperties)}}
{{#if (equal (type additionalProperties) "boolean")}}
**{{prefix_text}}Additional Properties:** {{jsoninline additionalProperties}}<br/>
{{else}}
**{{prefix_text}}Additional Properties**

|Name|Description|Type|
|----|-----------|----|
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoinobj ../path @key .)) name=@key}}
{{/each}}

{{/if}}
{{/if~}}

{{#if (isdefined minProperties)}}
**{{prefix_text}}Minimal Properties:** {{escape minProperties}}<br/>
{{/if~}}
{{#if (isdefined maxProperties)}}
**{{prefix_text}}Maximal Properties:** {{escape maxProperties}}<br/>
{{/if~}}
{{#if (and (isdefined propertyNames) (isdefined propertyNames.pattern))}}
**{{prefix_text}}Property Name Pattern:** {{jsoninline propertyNames.pattern}}<br/>
{{/if~}}
