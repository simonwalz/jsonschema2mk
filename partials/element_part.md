{{#if description}}

{{{description}}}

{{/if}}

{{> type . ~}}
{{#each (get_examples .) ~}}
{{> example ~}}
{{/each ~}}
