|
	{{~#mylink .}}`{{name}}`{{/mylink ~}}
	{{#if (and title (title_isnot_name .))}} ({{title}}){{/if ~}}
|
	{{~#if deprecated}}(DEPRECATED)<br/>{{/if}}
	{{~#if description ~}}
	{{{description}}}<br/>{{/if ~}}
	{{>extra_inline . ~}}
|
	{{~escape display_type ~}}
|
