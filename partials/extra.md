{{~#if (isdefined enum)}}<br/>
**{{prefix_text}}Enum:** {{jsoninline enum}}
{{~/if}}
{{~#if (isdefined const)}}<br/>
**{{prefix_text}}Constant Value:** {{jsoninline const}}
{{~/if}}
{{~#if (equal type "string") ~}}
	{{~#if (isdefined contentMediaType)}}<br/>
**{{prefix_text}}Content Media Type:** {{jsoninline contentMediaType}}
	{{~/if}}
	{{~#if (isdefined contentEncoding)}}<br/>
**{{prefix_text}}Content Encoding:** {{jsoninline contentEncoding}}
	{{~/if}}
	{{~#if (isdefined minLength)}}<br/>
**{{prefix_text}}Minimal Length:** {{jsoninline minLength}}
	{{~/if}}
	{{~#if (isdefined maxLength)}}<br/>
**{{prefix_text}}Maximal Length:** {{jsoninline maxLength}}
	{{~/if}}
	{{~#if (isdefined format)}}<br/>
**{{prefix_text}}Format:** {{jsoninline format}}
	{{~/if}}
	{{~#if (isdefined pattern)}}<br/>
**{{prefix_text}}Pattern:** {{escape pattern}}
	{{~/if}}
{{~/if}}
{{~#if (or (equal type "number") (equal type "integer"))~}}
	{{~#if (isdefined exclusiveMinimum)}}<br/>
**{{prefix_text}}Minimum (exclusive):** {{jsoninline exclusiveMinimum}}
	{{~/if}}
	{{~#if (isdefined minimum)}}<br/>
**{{prefix_text}}Minimum:** {{jsoninline minimum}}
	{{~/if}}
	{{~#if (isdefined exclusiveMaximum)}}<br/>
**{{prefix_text}}Maximum (exclusive):** {{jsoninline exclusiveMaximum}}
	{{~/if}}
	{{~#if (isdefined maximum)}}<br/>
**{{prefix_text}}Maximum:** {{jsoninline maximum}}
	{{~/if}}
	{{~#if (isdefined multipleOf)}}<br/>
**{{prefix_text}}Multiple of:** {{jsoninline multipleOf}}
	{{~/if}}
{{~/if~}}
