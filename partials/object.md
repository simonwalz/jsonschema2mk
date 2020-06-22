{{#if (length properties) ~}}
**{{prefix_text}}Properties**

|Name|Description|Type|
|----|-----------|----|
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoin ../path @key .)) name=@key}}
{{/each}}

{{/if}}
{{#if (isdefined required)}}
**{{prefix_text}}Required Properties:** {{escape required}}<br/>
{{/if~}}
{{#if (isdefined additionalProperties)}}
**{{prefix_text}}Additional Properties:** {{jsoninline additionalProperties}}<br/>
{{/if}}

