
{{~#if (isdefined enum)~}}
**{{prefix_text}}Enum:** {{jsoninline enum}}<br/>
{{/if}}
{{~#if (isdefined const)~}}
**{{prefix_text}}Constant Value:** {{jsoninline const}}<br/>
{{/if}}
{{~#if (is_type type "string") ~}}
	{{~#if (isdefined contentMediaType)~}}
**{{prefix_text}}Content Media Type:** {{jsoninline contentMediaType}}<br/>
{{/if}}
	{{~#if (isdefined contentEncoding)~}}
**{{prefix_text}}Content Encoding:** {{jsoninline contentEncoding}}<br/>
{{/if}}
	{{~#if (isdefined minLength)~}}
**{{prefix_text}}Minimal Length:** {{jsoninline minLength}}<br/>
{{/if}}
	{{~#if (isdefined maxLength)~}}
**{{prefix_text}}Maximal Length:** {{jsoninline maxLength}}<br/>
{{/if}}
	{{~#if (isdefined format)~}}
**{{prefix_text}}Format:** {{jsoninline format}}<br/>
{{/if}}
	{{~#if (isdefined pattern)~}}
**{{prefix_text}}Pattern:** {{escape pattern}}<br/>
{{/if}}
{{~/if}}
{{~#if (or (is_type type "number") (is_type type "integer"))~}}
	{{~#if (isdefined exclusiveMinimum)~}}
**{{prefix_text}}Minimum (exclusive):** {{jsoninline exclusiveMinimum}}<br/>
{{/if}}
	{{~#if (isdefined minimum)~}}
**{{prefix_text}}Minimum:** {{jsoninline minimum}}<br/>
{{/if}}
	{{~#if (isdefined exclusiveMaximum)~}}
**{{prefix_text}}Maximum (exclusive):** {{jsoninline exclusiveMaximum}}<br/>
{{/if}}
	{{~#if (isdefined maximum)~}}
**{{prefix_text}}Maximum:** {{jsoninline maximum}}<br/>
{{/if}}
	{{~#if (isdefined multipleOf)~}}
**{{prefix_text}}Multiple of:** {{jsoninline multipleOf}}<br/>
{{/if}}
{{~/if~}}
