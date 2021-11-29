{{#if (or description deprecated)}}

**Description**: {{#if deprecated}}(DEPRECATED) {{/if}}{{{description}}}

{{/if}}

{{> type . ~}}
