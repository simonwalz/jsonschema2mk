<a name="{{{or path 'root'}}}"></a>
{{{mdlevel path}}} {{#if path}}{{escape path}}: {{/if}}{{escape title}}
{{#if description}}

{{{description}}}

{{/if}}

{{> type . ~}}
{{#each (get_examples .) ~}}
{{> example ~}}
{{/each ~}}
{{#each (get_ref_items) ~}}
{{>element . ~}}
{{/each ~}}
