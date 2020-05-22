**{{prefix_text}}Properties**

|Name|Description|Type|Example|
|----|-----------|----|-------|
{{#each properties ~}}
{{> object_property (jsmk_property . path=(pathjoin path @key .) name=@key)}}
{{/each}}

{{~#if (isdefined required)}}<br/>
**{{prefix_text}}Required Properties:** {{escape required}}
{{~/if}}
{{~#if (isdefined additionalProperties)}}<br/>
**{{prefix_text}}Additional Properties:** {{jsoninline additionalProperties}}
{{~/if}}
