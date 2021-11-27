# {{subschema}} {{~#if title~}} ({{title}}) {{~/if}}

**Description**: 

{{#if (or description deprecated)}}

{{#if deprecated}}(DEPRECATED) {{/if}}{{{description}}}

{{/if}}
{{> type . ~}}
