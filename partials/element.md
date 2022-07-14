{{#if path~}}
<a name="{{{tolink (or path 'root')}}}"></a>
{{/if~}}
{{{mdlevel path}}}{{#if path}} {{escape path}}:{{/if}}{{#if title}} {{escape title}}{{/if}}
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
