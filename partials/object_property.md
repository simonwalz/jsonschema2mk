|
	{{~#if true}}**{{escape name}}**{{/if~}}
|
	{{~code display_type ~}}
|
	{{~#if deprecated}}(DEPRECATED)<br/>{{/if}}
	{{~#if description ~}}
    {{title}}.
    {{~/if~}}
    {{~#if description ~}}
	{{firstline description .}}<br/>{{/if ~}}
	{{>extra_inline . ~}}
|
	{{~#if (isdefined required)}}{{#if required}}yes{{else}}no{{/if}}{{/if~}}
|
