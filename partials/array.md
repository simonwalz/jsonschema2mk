{{#if (isdefined items)~}}
**Items{{#if items.title}}: {{items.title}}{{/if}}**

{{#if (or items.description items.deprecated)}}

{{#if items.deprecated}}(DEPRECATED) {{/if}}{{{items.description}}}

{{/if~}}

{{> type items path=(pathjoin path "" .) prefix_text="Item "}}

{{#if (isdefined minItems)}}
**Minimum Items:** {{escape minItems}}<br/>
{{/if~}}
{{#if (isdefined maxItems)}}
**Maximum Items:** {{escape maxItems}}<br/>
{{/if~}}
{{#if (isdefined uniqueItems)}}
**Unique Items:** {{jsoninline uniqueItems}}<br/>
{{/if~}}

{{/if~}}

{{#if (isdefined contains)~}}
**Contains Items{{#if contains.title}}: {{contains.title}}{{/if}}**

{{#if (or contains.description contains.deprecated)}}

{{#if contains.deprecated}}(DEPRECATED) {{/if}}{{{contains.description}}}

{{/if~}}

{{> type contains path=(pathjoin path "" .) prefix_text="Contains Item "}}

{{#if (isdefined minContains)}}
**Minimum Contains:** {{escape minContains}}<br/>
{{/if~}}
{{~#if (isdefined maxContains)}}
**Maximum Contains:** {{escape maxContains}}<br/>
{{/if~}}

{{/if~}}
