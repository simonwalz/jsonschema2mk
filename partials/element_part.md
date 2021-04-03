{{#if (or description deprecated)}}

{{#if deprecated}}(DEPRECATED) {{/if}}{{{description}}}

{{/if}}

{{> type . ~}}
{{#each (get_examples .) ~}}
{{> example ~}}
{{/each ~}}
