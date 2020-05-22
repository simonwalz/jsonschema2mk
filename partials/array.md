**Items{{#if items.title}}: {{items.title}}{{/if}}**

{{#if items.description}}

{{{items.description}}}
{{/if}}
{{> type items path=(pathjoin path "item" .) prefix_text="Item "}}
