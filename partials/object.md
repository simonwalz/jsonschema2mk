**Properties**

|Name|Description|Type|Example|
|----|-----------|----|-------|
{{#each properties_table ~}}
|{{#if link}}[{{escape name}}]({{{link}}}){{else}}{{escape name}}{{/if}}|{{{description}}}|{{escape type}}|{{#each examples}}{{jsoninline .}} {{/each}}|
{{/each}}
