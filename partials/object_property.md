|
	{{~#mylink .}}**{{name}}**{{/mylink ~}}
	{{#if (and title (title_isnot_name .))}}<br/>({{title}}){{/if ~}}
|
	{{~code display_type ~}}
|
	{{~#if deprecated}}(DEPRECATED)<br/>{{/if}}
	{{~#if description ~}}
	{{{description}}}<br/>{{/if ~}}
	{{>extra_inline . ~}}
|
	{{~#if (isdefined required)}}{{#if required}}yes{{else}}no{{/if}}{{/if~}}
|
