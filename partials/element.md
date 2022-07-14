{{#if path~}}
<a name="{{{tolink (or path 'root')}}}"></a>
{{/if~}}
{{{mdlevel path}}}{{#if path}} {{escape path}}:{{/if}} {{escape (or title (or type 'any'))}}
{{#if (or description deprecated)}}

{{#if deprecated}}(DEPRECATED) {{/if}}{{{description}}}

{{/if}}

{{> type . ~}}
{{#each (get_examples .) ~}}
{{> example ~}}
{{/each ~}}
{{#each (get_ref_items) ~}}
{{>element . ~}}
{{/each ~}}
