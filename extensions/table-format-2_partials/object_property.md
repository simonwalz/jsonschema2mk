|
	{{~#mylink .}}**{{escape name}}**{{/mylink ~}}
|
	{{~code display_type ~}}
|
	{{~escape title~}}
|
	{{~#if deprecated}}(DEPRECATED)<br/>{{/if}}
	{{~#if description ~}}
	{{firstline description .}}<br/>{{/if ~}}
	{{>extra_inline . ~}}
|
	{{~#if (isdefined required)}}{{#if required}}yes{{else}}no{{/if}}{{/if~}}
|
